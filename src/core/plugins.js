/**
 * © 2014 Liferay, Inc. <https://liferay.com>
 *
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

// Wraps each of the plugin lifecycle methods in a closure that will
// set up the editor.__processingPlugin__ variable so it can be globally
// accessed exposing the plugin being processed and the lifecycle phase
// in which it is happening
//
// @param {Object} plugin The plugin to wrap lifecycle methods
const wrapPluginLifecycle = function(plugin) {
	const methods = ['beforeInit', 'init', 'afterInit'];

	methods.forEach(methodName => {
		if (plugin[methodName]) {
			plugin[methodName] = CKEDITOR.tools.override(
				plugin[methodName],
				originalPluginMethod => {
					const payload = {
						phase: methodName,
						plugin,
					};

					return function(editor) {
						editor.__processingPlugin__ = payload;

						// eslint-disable-next-line no-invalid-this
						originalPluginMethod.call(this, editor);

						editor.__processingPlugin__ = null;
					};
				}
			);
		}
	});
};

// Filters the requires object to remove unwanted dependencies. At this point
// only 'toolbar' has been identified, but more can appear. An unwanted plugin
// dependency is one that prevents a necessary plugin from being removed
//
// @param {string|Array<string>} requires The requires object
// @return {string} The filtered requires object
const filterUnwantedDependencies = function(requires) {
	if (typeof requires === 'string') {
		requires = requires.split(',');
	}

	return requires.filter(require => {
		return require !== 'toolbar';
	});
};

/**
 * CKEDITOR.plugins class utility which adds additional methods to those of CKEditor.
 *
 * @class CKEDITOR.plugins
 */

/**
 * Overrides CKEDITOR.plugins.load method so we can extend the lifecycle methods of
 * the loaded plugins to add some metainformation about the plugin being processed
 *
 * @param {String/Array} names The name of the resource to load. It may be a
 * string with a single resource name, or an array with several names.
 * @param {Function} callback A function to be called when all resources
 * are loaded. The callback will receive an array containing all loaded names.
 * @param {Object} [scope] The scope object to be used for the callback call.
 * @memberof CKEDITOR.plugins
 * @method load
 * @static
 */
CKEDITOR.plugins.load = CKEDITOR.tools.override(
	CKEDITOR.plugins.load,
	pluginsLoad => {
		// Wrap original load function so we can transform the plugin input parameter
		// before passing it down to the original callback
		return function(names, callback, scope) {
			// eslint-disable-next-line no-invalid-this
			pluginsLoad.call(this, names, plugins => {
				if (callback) {
					Object.keys(plugins).forEach(pluginName => {
						const plugin = plugins[pluginName];

						if (plugin.requires) {
							plugin.requires = filterUnwantedDependencies(
								plugin.requires
							);
						}

						wrapPluginLifecycle(plugin);
					});

					callback.call(scope, plugins);
				}
			});
		};
	}
);
