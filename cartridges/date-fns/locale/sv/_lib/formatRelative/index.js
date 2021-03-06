'use strict';

var formatRelativeLocale = {
    lastWeek: "'i' EEEE's kl.' p",
    yesterday: "'igår kl.' p",
    today: "'idag kl.' p",
    tomorrow: "'imorgon kl.' p",
    nextWeek: "'på' EEEE 'kl.' p",
    other: 'P'
};

module.exports = function formatRelative(token, _date, _baseDate, _options) {
    return formatRelativeLocale[token];
};
