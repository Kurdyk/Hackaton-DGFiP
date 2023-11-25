

#----------------------------#
#         Constantes         #
#----------------------------#

### CONSTANTES A MODIFIER PAR USR ###
-------------------------------------

n_ville_1 = '154'
n_ville_2 = '166'

### CONSTANTES IMMUABLES COUCOU ###
-----------------------------------

DFPOP = pd.DataFrame(dataPop.json()) [['nom','population']]
DFREI = pd.read_csv('/home/dune/Téléchargements/Hackathon/REI_2022.csv')

DFP2 = pd.read_csv('/home/dune/Téléchargements/Hackathon/Ressources_HackathonDGFiP_novembre2023/GF-2C/160_CHARENTE_ART-P2.csv',header = 1, delimiter=';')
DFP1 = pd.read_csv('/home/dune/Téléchargements/Hackathon/Ressources_HackathonDGFiP_novembre2023/GF-2C/160_CHARENTE_ART-P1.csv',header = 1, delimiter=';',encoding='latin-1')
DFC1 = pd.read_csv('/home/dune/Téléchargements/Hackathon/Ressources_HackathonDGFiP_novembre2023/GF-2C/160_CHARENTE_ART-C1.csv',header = 1, delimiter=';',encoding='latin-1')
DFA1 = pd.read_csv('/home/dune/Téléchargements/Hackathon/Ressources_HackathonDGFiP_novembre2023/GF-2C/160_CHARENTE_ART-A1.csv',header = 1, delimiter=',',encoding='latin-1')

filtered_columns = [col for col in DFREI.columns if 'CFE' in col]
filtered_columns.append('Libellé commune')
DFREI = DFREI[filtered_columns]

# P2 : Base brute, réduction, montant rce
DFP2f = pd.concat([DFP2[['MBBS0','MOETA2','MOETR2','CTCN','NCCO']].iloc[0:1],DFP2[['MBBS0','MOETA2','MOETR2','CTCN','NCCO']].iloc[8:]])

# P1 : Base après réduction, base exonérée cfe commune, première exonération, deuxième exonération, base taxable commune
DFP1f = pd.concat([DFP1[['MBBSR', 'MNTPXC', 'CNEX01', 'CNEX02','MOBS20','CTCN','NCCO']].iloc[0:1],DFP1[['MBBSR', 'MNTPXC', 'CNEX01', 'CNEX02','MOBS20','CTCN','NCCO']].iloc[8:]])

# C1 : Nature de l'activité
DFC1f = pd.concat([DFC1[['CNAC3','CTCN','NCCO']].iloc[0:1], DFC1[['CNAC3','CTCN','NCCO']].iloc[8:]])

# A1 : Taux CFE commune
DFA1f = DFA1[['TXCNU0','CTCN','LTCN']]

merged_df = pd.merge(DFP2f, DFP1f, on=['NCCO','CTCN'], how='inner')
merged_df = pd.merge(merged_df, DFC1f, on=['NCCO','CTCN'], how='inner')
merged_df = pd.merge(merged_df, DFA1f, on=['CTCN'], how='left')
merged_df = merged_df.dropna()

colonnes = ['MBBS0', 'MOETA2', 'MOETR2', 'CTCN', 'NCCO', 'MBBSR', 'MNTPXC','CNEX01', 'CNEX02', 'MOBS20', 'CNAC3', 'TXCNT0']

merged_df[['CTCN','LTCN','TXCNU0','NCCO','CNAC3','MBBS0','MBBSR', 'MNTPXC', 'MOETA2', 'MOETR2','CNEX01', 'CNEX02', 'MOBS20']]

DFVille1 = merged_df[merged_df['CTCN'] == n_ville_1]
DFVille2 = merged_df[merged_df['CTCN'] == n_ville_2]

#----------------------------#
#  Utilité pratique directe  #
#----------------------------#

def code_to_CP(code):
# A l'aide du code CTCN, renvoie le code postal de la commune correspondante
    nom_ville = DFA1f[DFA1f['CTCN']==code]['LTCN'].unique()[0]
    print(nom_ville)
    nom_ville = nom_ville[0] + nom_ville[1:].lower()
    print(nom_ville)
    url = 'https://geo.api.gouv.fr/communes?nom=' + nom_ville
    rep = requests.get(url).json()

    for ville in rep:
        if '16' in ville['codesPostaux'][0]:
            return ville['codesPostaux'][0]

def exo_commune(DFVille):
# Renvoie les types d'exonérations actuellement appliquées dans une commune dont l'ensemble des entreprises est donné par DFVille
    unique_values = DFVille['CNEX01'].unique()
    return unique_values

#---------------------------------------------------------#
#  Utilité dans calculs, imports dans d'autres fonctions  #
#---------------------------------------------------------#

def depart(b1,b2,t1,t2, n1, n2,seuil=0.05, seuil2=0.15, seuil_concu = 0.5):
 ## renvoie 1 si l'entreprise part de la ville 1 vers la ville 2 (ou reste dans la ville 2)

    C1 = b1*t1
    C2 = b2*t2

    conc = n2/(n1 + n2)

    if C1>(seuil +1)*C2 and conc < seuil_concu:
        return 1
    elif C1>(seuil2 + 1)*C2:
        return 1
    return 0

def repartition_ent(Tf1,Tf2):
## Determination du nouveau mappage des entreprises sur les 2 villes, après modification des taux
    L1 = []
    L2 = []

    for ent in Tf1['NCCO'].unique():
        type_ent = Tf1[Tf1['NCCO']==ent]['CNAC3'].unique()[0]
        L1.append([ent,type_ent])
    for ent in Tf2['NCCO'].unique():
        type_ent = Tf2[Tf2['NCCO']==ent]['CNAC3'].unique()[0]
        L2.append([ent,type_ent])
    return L1,L2

def nb_ent_type(Rep,type_ent):
## Nombre d'entreprises d'un type type_ent dans une ville dont les entreprises installées sont listées dans Rep
    n=0
    for ent in Rep:
        if ent[1]==type_ent:
            n+=1
    return n

def departs_successifs(type_ent,Li1,Li2,b1,b2,t1,t2, seuil=0.05, seuil2=0.15, seuil_concu = 0.5):
## Répartition des entreprises après une modification du taux ou des bases b1, b2, t1, t2
## On dit que les entreprises prennent leur décision de migrer ou non les unes après les autres, d'ou le terme 'successif'
## On considère qu'une entreprise décide de partir de sa commune si le taux de sa commune est supérieur de 5% à celui de l'autre commune, dans le cas ou il fait fasse à une concurrence importante dans sa propre commune
## On considère qu'une entreprise décide de partir de sa commune si le taux de sa commune est supérieur de 15% à celui de l'autre commune, dans le cas ou il fera fasse à une concurrence importante en changeant de commune
## Ces seuils sont modifiables avec les variables seuil, seuil2 et seuil_concu (dans le cas ou l'autre commune est plus grande spatialement, il est cohérent de considérer que la concurrence ne dépend pas que ddu nombre d'entreprise 
    
    n1 = nb_ent_type(Li1,type_ent)
    n2 = nb_ent_type(Li2,type_ent)
    
    Lf1 = []
    Lf2 = []


    for ent in Li1 :
        if ent[1]==type_ent:
            if depart(b1,b2,t1,t2, n1, n2,seuil, seuil2, seuil_concu):
                Lf2.append(ent)
                n2+=1
                n1-=1
            else:
                Lf1.append(ent)
    for ent in Li2 :
        if ent[1]==type_ent:
            if depart(b2,b1,t2,t1, n2, n1,seuil, seuil2, seuil_concu):
                Lf1.append(ent)
                n1+=1
                n2-=1
            else:
                Lf2.append(ent)  
    return Lf1,Lf2

def bases_type_ville(type_ent,DFVille1,DFVille2):
    b1 = DFVille1[DFVille1['CNAC3']==type_ent]['MBBSR'].unique()[0]
    b2 = DFVille2[DFVille2['CNAC3']==type_ent]['MBBSR'].unique()[0]


def bases_optimales(type_ent,b1,t1,b2,t2,Li1,Li2,prop = 0.5,eps = 0.15):

    #On décide de ne jouer que sur la commune 1

    iter = 0
    b1opt = b1
    b2opt = b2

    L1,L2 = departs_successifs(type_ent,Li1,Li2,b1opt,b2opt,t1,t2)
    n1 = nb_ent_type(L1,type_ent)
    n2 = nb_ent_type(L2,type_ent)

    while (n1/(n1+n2)<prop-eps or n1/(n1+n2)>prop+eps) and iter<1000:
        L1,L2 = departs_successifs(type_ent,L1,L2,b1opt,b2opt,t1,t2)

        n1 = nb_ent_type(L1,type_ent)
        n2 = nb_ent_type(L2,type_ent)
        iter+=1

        if b1opt*t1 < b2opt*t2:
            b1opt+=100
        else :
            b1opt-=100

    return b1opt,b2opt



#--------------------------------------------------------------#
#  Fonctions en rapport avec l'optimisation, et fonctions obj  #
#--------------------------------------------------------------#

def pres_ent_ville(type,DFVille):
    return int(len(DFVille[DFVille['CNAC3']==type])!=0)

def fonction_objectif(types,DFVille1,DFVille2):
    f = 0
    for type in types : 
        for DFVille in  [DFVille1,DFVille2]:
            f+=pres_ent_ville(type,DFVille)
    return f

