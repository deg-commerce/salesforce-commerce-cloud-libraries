'use strict';

var formatRelativeLocale = {
    lastWeek: "eeee 'lalu pukul' p",
    yesterday: "'Kemarin pukul' p",
    today: "'Hari ini pukul' p",
    tomorrow: "'Besok pukul' p",
    nextWeek: "eeee 'pukul' p",
    other: 'P'
};

module.exports = function formatRelative(token, _date, _baseDate, _options) {
    return formatRelativeLocale[token];
};
