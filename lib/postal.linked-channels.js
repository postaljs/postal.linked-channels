/**
 * postal - postal.js add-on enabling forwarding from one channel/topic to another.
 * Author: Jim Cowart (http://ifandelse.com/)
 * Version: v0.1.0
 * Url: http://github.com/postaljs/postal.linked-channels
 * License(s): MIT
 */
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(["lodash", "postal"], function (_, postal) {
            return factory(_, postal, root);
        });
    } else if (typeof module === "object" && module.exports) {
        // Node, or CommonJS-Like environments
        module.exports = function (postal) {
            return factory(require("lodash"), postal, this);
        };
    } else {
        // Browser globals
        root.postal = factory(root._, root.postal, root);
    }
}(this, function (_, postal, global, undefined) {
    postal.linkChannels = function linkChannels(sources, destinations) {
        var result = [],
            self = this;
        sources = !_.isArray(sources) ? [sources] : sources;
        destinations = !_.isArray(destinations) ? [destinations] : destinations;
        _.each(sources, function (source) {
            var sourceTopic = source.topic || "#";
            _.each(destinations, function (destination) {
                var destChannel = destination.channel || self.configuration.DEFAULT_CHANNEL;
                result.push(
                self.subscribe({
                    channel: source.channel || self.configuration.DEFAULT_CHANNEL,
                    topic: sourceTopic,
                    callback: function (data, env) {
                        var newEnv = _.clone(env);
                        newEnv.topic = _.isFunction(destination.topic) ? destination.topic(env.topic) : destination.topic || env.topic;
                        newEnv.channel = destChannel;
                        newEnv.data = data;
                        self.publish(newEnv);
                    }
                }));
            });
        });
        return result;
    };
    return postal;
}));