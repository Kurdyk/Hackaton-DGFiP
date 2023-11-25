def code_to_CP(code):

    nom_ville = DFA1f[DFA1f['CTCN']==code]['LTCN'].unique()[0]
    print(nom_ville)
    nom_ville = nom_ville[0] + nom_ville[1:].lower()
    print(nom_ville)
    url = 'https://geo.api.gouv.fr/communes?nom=' + nom_ville
    rep = requests.get(url).json()

    for ville in rep:
        if '16' in ville['codesPostaux'][0]:
            return ville['codesPostaux'][0]
