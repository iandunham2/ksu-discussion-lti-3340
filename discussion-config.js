'use strict';

// Maps D2L content topic IDs → internal disc keys (COMM 3340 only)
const TOPIC_ID_TO_DISC = {
    '61805440': '3340-mod1',
    '61805441': '3340-mod2',
    '61805442': '3340-mod3',
    '61805443': '3340-mod4',
    '61805444': '3340-mod5',
    '61805445': '3340-mod6',
    '61805446': '3340-mod7',
    '61805447': '3340-mod8',
    '61805448': '3340-mod9',
    '61805449': '3340-mod10',
    '61805450': '3340-mod11',
    '61805451': '3340-mod13',
    '61805452': '3340-mod15',
};

// D2L resource_link_title values → disc keys (COMM 3340 only)
const TITLE_TO_DISC = {
    'Module 1 Discussion': '3340-mod1',
    'Module 2 Discussion': '3340-mod2',
    'Module 3 Discussion': '3340-mod3',
    'Module 4 Discussion': '3340-mod4',
    'Module 5 Discussion': '3340-mod5',
    'Module 6 Discussion': '3340-mod6',
    'Module 7 Discussion': '3340-mod7',
    'Module 8 Discussion': '3340-mod8',
    'Module 9 Discussion': '3340-mod9',
    'Module 10 Discussion': '3340-mod10',
    'Module 11 Discussion': '3340-mod11',
    'Module 13 Discussion': '3340-mod13',
    'Module 15 Discussion': '3340-mod15',
};

/**
 * Resolve the internal disc key for a discussion launch.
 * Priority: query param → custom LTI param → D2L topic ID → link title → DB mapping.
 */
function resolveDisc({ queryDisc, body, resourceLinkTitle, extD2lLinkId, dbDisc }) {
    if (queryDisc && typeof queryDisc === 'string' && queryDisc.trim()) {
        return queryDisc.trim();
    }

    const customDisc = body?.custom_disc || body?.['custom_disc'];
    if (customDisc && typeof customDisc === 'string') {
        return customDisc.trim();
    }

    if (extD2lLinkId && TOPIC_ID_TO_DISC[String(extD2lLinkId)]) {
        return TOPIC_ID_TO_DISC[String(extD2lLinkId)];
    }

    if (resourceLinkTitle && TITLE_TO_DISC[resourceLinkTitle]) {
        return TITLE_TO_DISC[resourceLinkTitle];
    }

    return dbDisc || null;
}

function discFromTitle(title) {
    return title ? TITLE_TO_DISC[title] || null : null;
}

module.exports = {
    TOPIC_ID_TO_DISC,
    TITLE_TO_DISC,
    resolveDisc,
    discFromTitle,
};
