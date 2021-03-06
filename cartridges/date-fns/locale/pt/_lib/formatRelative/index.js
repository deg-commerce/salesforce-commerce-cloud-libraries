'use strict';

var formatRelativeLocale = {
    lastWeek: "'na última' eeee 'às' p",
    yesterday: "'ontem às' p",
    today: "'hoje às' p",
    tomorrow: "'amanhã às' p",
    nextWeek: "eeee 'às' p",
    other: 'P'
};

module.exports = function formatRelative(token, _date, _baseDate, _options) {
    return formatRelativeLocale[token];
};
