function pluralize(n, str) {
    if (n === 1) { return str; }
    return str + 's';
}

function fmtTime(n, unit) {
    return `${n} ${pluralize(n, unit)}`
}

function humanTime(seconds) {
    if (seconds === 0) {
        return 'a moment';
    }

    else if (seconds === 1) {
        return 'a second';
    }

    else if (seconds < 60) {
        return fmtTime(seconds, 'second');
    }

    else if (60 <= seconds && seconds < 120) {
        return 'a minute';
    }

    else if (120 <= seconds && seconds < 3600) {
        let minutes = Math.floor(seconds / 60)
        return fmtTime(minutes, 'minute');
    }

    else if (3600 <= seconds && seconds < 3600 * 2) {
        return 'an hour';
    }

    else if (seconds > 3600) {
        let hours = Math.floor(seconds / 3600)
        return fmtTime(hours, 'hour');
    }
}


module.exports = function (seconds) {
    return [
        humanTime(seconds),
        seconds > 0 ? 'ago' : 'from now'
    ].join(' ');
}