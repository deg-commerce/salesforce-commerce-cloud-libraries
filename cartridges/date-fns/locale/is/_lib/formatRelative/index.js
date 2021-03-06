'use strict';

var formatRelativeLocale = {
    lastWeek: "'síðasta' dddd 'kl.' p",
    yesterday: "'í gær kl.' p",
    today: "'í dag kl.' p",
    tomorrow: "'á morgun kl.' p",
    nextWeek: "dddd 'kl.' p",
    other: 'L'
};

module.exports = function formatRelative(token, _date, _baseDate, _options) {
    return formatRelativeLocale[token];
};
