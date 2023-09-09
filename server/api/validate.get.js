export default eventHandler(async (event) => {
    setResponseHeaders(event, {
        "Content-Type": "application/json; charset=utf-8",
    });

    const addresses = await $fetch('' +
        'https://ags.cuzk.cz/arcgis/rest/services/RUIAN/Vyhledavaci_sluzba_nad_daty_RUIAN/MapServer/exts/GeocodeSOE/findAddressCandidates' +
        '?f=pjson' +
        '&maxLocations=9999' +
        '&SingleLine=' + getQuery(event)?.address ?? ''
    );

    return [... new Set(
        JSON.parse(addresses).candidates
            .map(candidate => candidate.address)
    )];
});