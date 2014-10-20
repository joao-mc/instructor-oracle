if (Wbs.find().count() === 0){
    Wbs.insert({
        code: 'C05454',
        abbrev: 'AGSS',
        desc: 'ArcGIS Sharing with Server',
        keywords: 'server',
        course: true,
        modifier: false
    });
    Wbs.insert({
        code: 'C00666',
        abbrev: 'BSHS',
        desc: 'Bullshit and horse shit',
        keywords: 'content',
        course: true,
        modifier: false
    });
    Wbs.insert({
        code: '4710',
        abbrev: 'OVR',
        desc: 'Overhead',
        keywords: 'manure',
        course: false,
        modifier: false
    });
    Wbs.insert({
        code: 'E4383',
        abbrev: 'Mothership Onsite',
        desc: 'teach on site at the Mothership',
        keywords: 'smog',
        course: true,
        modifier: true
    });
    Wbs.insert({
        code: 'E0666',
        abbrev: 'Mothership Clientside',
        desc: 'teach client side in Mothership region',
        keywords: 'smog',
        course: true,
        modifier: true
    })
}
