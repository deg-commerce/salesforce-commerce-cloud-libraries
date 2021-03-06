'use strict';

var formatRelativeLocale = {
    lastWeek: "'pasinta' eeee 'je' p",
    yesterday: "'hieraŭ je' p",
    today: "'hodiaŭ je' p",
    tomorrow: "'morgaŭ je' p",
    nextWeek: "eeee 'je' p",
    other: 'P'
};

module.exports = function formatRelative(token, _date, _baseDate, _options) {
    return formatRelativeLocale[token];
};
