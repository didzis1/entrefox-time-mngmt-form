import React from 'react'
import { getAnswerByID } from '../utils'
import PieChart from '../components/summaryComponents/PieChart'

//Material UI
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const summaryContent = (formData) => {
	console.log(formData)
	const firstSlider = getAnswerByID(1, 1, formData)?.value
	const secondSlider = getAnswerByID(3, 5, formData)?.value
	console.log(firstSlider)
	console.log(secondSlider)
	return [
		{
			id: 1,
			question: 2,
			condition: 'YES',
			content: (
				<Box>
					<Typography>
						Olet vastannut haluavasi muutosta siihen miten
						vuorokautesi tunnit jakautuvat työn, levon ja muun
						tekemisen välillä. Vaikka aikaa ei voi hallita, omaa
						ajankäyttöään voi suunnitella ja seurata. Näet alla
						rinnakkain, miten aikasi jakautuu nyt ja miten toivot,
						että se jakautuisi tulevaisuudessa.
					</Typography>
					<Box my={3}>
						<Grid container direction='row' justify='space-around'>
							<Grid item xs={12} sm={8} md={5}>
								<PieChart pieData={firstSlider} />
							</Grid>{' '}
							<Grid item xs={12} sm={8} md={5}>
								<PieChart pieData={secondSlider} />
							</Grid>
						</Grid>
					</Box>{' '}
					<Typography>
						Todennäköisesti yllä olevissa kuvioissa on todella
						eroavaisuuksia. Sinulla on ehkä tarve levätä lisää,
						saada ajatukset irti työstä tekemällä jotain sinua
						ilahduttavaa tai viettää aikaa yhdessä muiden kanssa.
						Keinot muuttaa sitä, mihin aikasi kuluu voi olla vaikeaa
						mutta se kannattaa. Kirjoita itsellesi ylös MITÄ tuo
						kaipaamasi muutos ajankäytössä tarkoittaa käytännössä:
						Mitä tekemistä lisäät elämääsi ja mistä puolestaan
						vähennät. Ole konkreettinen ja rehellinen itsellesi.
						Olet vastannut, että haluat muutosta ja asettanut
						muutoksen tavoitepäiväksi [valittu pvm]. Mitä tämä
						tarkoittaa lyhyellä aikavälillä? Kirjaa ylös ensi
						askeleet muutokset tiellä ja listaa muutosta. Mitkä ovat
						ensimmäiset askeleet muutoksen tiellä ja mikä tai kuka
						tukee sinua muutoksessa. Oman etenemisen seurannassa on
						hyvä laittaa itselle välitavoitteita ja kiittää itseään
						etenemisestä.
					</Typography>
				</Box>
			)
		},
		{
			id: 2,
			question: 2,
			condition: 'MAYBE',
			content: (
				<Box>
					<Typography>
						Sinussa kytee kiinnostus pohtia miten vuorokautesi
						tunnit jakautuvat työn, levon ja muun tekemisen välillä.
						Vaikka aikaa ei voi hallita, omaa ajankäyttöään voi
						suunnitella ja seurata. Näet alla rinnakkain, miten
						aikasi jakautuu nyt ja miten toivot, että se jakautuisi
						tulevaisuudessa
					</Typography>
					<Box my={3}>
						tähän piirakkakuvio x [kysymys 1 valitut arvot ] ja x
						[kysymys 4 valitut arvot ]
					</Box>{' '}
					<Typography>
						Jos yllä olevissa kuvioissa on eroja, sinulla ehkä on
						tarve levätä lisää, saada ajatukset irti työstä
						tekemällä jotain sinua ilahduttavaa tai viettää aikaa
						yhdessä muiden kanssa. Kirjoita itsellesi ylös mitä tuo
						kaipaamasi muutos ajankäytössä tarkoittaa käytännössä:
						mitä tekemistä haluat enemmän elämääsi ja mitä haluat
						vähentää. Ole avoin omille ideoillesi ja kunnioita
						arvojasi.
					</Typography>
					<Typography>
						Vastasit, että olet kiinnostunut tavoittelemaan muutosta
						[valittu taso kysymys 3] ja asettanut muutoksen
						tavoitepäiväksi [valittu pvm]. Ideoi ensi askeleita
						kohti muutosta, kartoita muutoksen hidasteet ja kirjaa
						ylös mikä tai kuka voisi tukea sinua muutoksen
						toteuttamisessa. Oman etenemisen seurannassa on hyvä
						laittaa itselle välitavoitteita ja kiittää itseään
						etenemisestä.
					</Typography>
				</Box>
			)
		},
		{
			id: 3,
			question: 2,
			condition: 'NO',
			content: (
				<Box>
					<Typography>
						Näin arvioit, että aikasi jakautuu tällä hetkellä työn,
						unen ja muun ajan välillä.
					</Typography>
					<Box my={3}>
						tähän piirakkakuvio x [kysymys 1 valitut arvot ]
					</Box>{' '}
					<Typography>
						Et halua muutosta, joten vaikuttaa sitä, että olet
						tyytyväinen nykytilanteeseen. Nyt on oikea aika kehua
						itseäsi: sinulla on homma hanskassa. Hienoa, että
						käytettävissä oleva aika menee oikeisiin asioihin, saat
						riittävästi aikaa itsellesi, työlle ja levolle.
					</Typography>
				</Box>
			)
		},
		{
			id: 4,
			question: 5,
			condition: 'YES',
			content: (
				<Box>
					<Typography>
						Vastasit haluavasi muutosta myös siihen, kuinka aikasi
						jakautuu eri työtehtävien välillä. Alla näet vertailua
						siitä, miten työtehtäväsi jakautuvat tällä hetkellä ja
						miten toivoisit, että ne jakautuisivat.
					</Typography>
					<Box my={3}>
						tähän kuvio x [kysymys 5 valitut arvot ] ja x [kysymys 9
						valitut arvot ]
					</Box>{' '}
					<Typography>
						Nyt voisi olla priorisoinnin tai töiden uudelleen
						järjestämisen paikka. Mieti, keskitytkö yrityksen ja
						oman jaksamisesi kannalta oikeisiin asioihin – myös
						pitkällä tähtäimellä. Ovatko kaikki aikaa syövät
						tehtävät välttämättömiä? Voiko niitä siirtää, delegoida
						tai jättää tekemättä? Ehkä tuttavapiirissäsi on
						yrittäjiä, joilla on energiaa vaikka muille jakaa. Kysy
						häneltä, miten hän on aikansa järjestänyt. Tekeekö hän
						ehkä yhteistyötä toisen yrittäjän kanssa markkinoinnissa
						ja myynnissä? Ehkä hän ostaa joitain palveluja
						yrityksensä pyörittämisen tueksi.
					</Typography>
					<Typography>
						Olet vastannut, että haluat muutosta työtehtäviesi
						ajankäytössä [valittu taso kysymys 8] ja asettanut
						muutoksen tavoitepäiväksi [valittu pvm]. Aloita
						kartoittamalla tilanne: kirjaa viikon aikana ylös, mihin
						kaikkeen käytät omaa aikaasi. Merkitse asiat
						mahdollisimman tarkasti ja totuudenmukaisesti. Viikon
						päättyessä tarkastele omaa ajankäyttöäsi: mihin kaikkeen
						käytät aikasi ja löydätkö listasta niin sanottuja
						aikavarkaita? Tarkastelun jälkeen suunnittele haluamasi
						muutokset.
					</Typography>
					<Typography>
						Aseta itsellesi välitavoitteita ja hyödynnä
						apuvälineitä. Ota käyttöön neljän kohdan tehtävälistan,
						joka viikoittain käytettynä säästää aikaasi ja parantaa
						töiden hallittavuutta:
						https://www.entrefox.fi/arjen-ajanhallinta/ . Hyödynnä
						sovelluksia, joissa voit ajastaa työtehtäviä. Näitä ovat
						muun muassa Todoist https://todoist.com/app/today ja
						Keep my notes https://www.kitetech.co/keepmynotes. Etsi
						myös itsellesi ‘ajanhallintakaveri’. Tämä voi olla
						ystävä tai hengenheimolainen, jolta saat vertaistukea,
						tai vaihtoehtoisesti kokeneempi ’coachi’, jolta saat
						kommentteja ja ideoita ajankäyttöösi.
					</Typography>
					<Typography>
						Vastasit myös, että suunnittelet työtehtäviäsi tällä
						hetkellä [kysymys 10 valitut arvot ]. Kysy itseltäsi,
						onko tämä suunnittelun aikaväli riittävä ja tukeeko
						nykyinen tapasi suunnitella haluamaasi muutosta.
					</Typography>
				</Box>
			)
		},
		{
			id: 5,
			question: 5,
			condition: 'MAYBE',
			content: (
				<Box>
					<Typography>
						Olet kiinnostunut pohtimaan sitä, miten aikasi kuluu eri
						työtehtäviin. Ehkä kaipaat siihen muutosta. Tarkastele
						alla olevan koostetta omista vastauksistasi.
					</Typography>
					<Box my={3}>
						tähän kuvio x [kysymys 5 valitut arvot ] ja x [kysymys 9
						valitut arvot ]
					</Box>{' '}
					<Typography>
						Nyt voi olla priorisoinnin tai töiden uudelleen
						järjestämisen paikka. Mieti, keskitytkö yrityksen ja
						oman jaksamisesi kannalta oikeisiin asioihin – myös
						pitkällä tähtäimellä. Keinot muuttaa sitä, mihin
						työtehtäviin aikasi kuluu voi olla vaikeaa etkä ole
						muutoksen tarpeellisuudesta täysin varma. Kartoita silti
						tilanne: ehkä tuttavapiirissäsi on yrittäjiä, joilla on
						energiaa vaikka muille jakaa. Kysy häneltä, miten hän on
						aikansa järjestänyt. Tekeekö hän ehkä yhteistyötä toisen
						yrittäjän kanssa markkinoinnissa ja myynnissä? Ehkä hän
						ostaa joitain palveluja yrityksensä pyörittämisen
						tueksi.
					</Typography>
					<Typography>
						Vastasit, että olet kiinnostunut tavoittelemaan muutosta
						työtehtävien ajankäytössä [valittu taso kysymys 8] ja
						asettanut muutoksen tavoitepäiväksi [valittu pvm].
						Seuraa viikon aikana sitä, mihin työaikasi kuluu.
						Merkitse asiat mahdollisimman tarkasti ja
						totuudenmukaisesti. Viikon päättyessä voit tarkastella
						omaa ajankäyttöäsi: mihin kaikkeen käytät aikaasi ja
						löydätkö listasta niin sanottuja aikavarkaita?
						Tarkastelun jälkeen sinun on parempi käsitys
						muutostarpeista.
					</Typography>
					<Typography>
						Välitavoitteiden asettaminen ja apuvälineiden käyttö
						tukee muutosta. Kokeile neljän kohdan tehtävälistaa,
						joka viikoittain käytettynä säästää aikaasi ja parantaa
						töiden hallittavuutta:
						https://www.entrefox.fi/arjen-ajanhallinta/. Hyödynnä
						kalenteria ja sovelluksia, joissa voit ajastaa
						työtehtäviä. Näitä ovat muun muassa Todoist
						https://todoist.com/app/today ja Keep my notes
						https://www.kitetech.co/keepmynotes. Juttele muiden
						samantapaista työtä tekevien kanssa siitä, miten he
						käyttävät työaikansa. Tämä voi olla ystävä tai
						hengenheimolainen, jolta saat vertaistukea, tai
						vaihtoehtoisesti kokeneempi ’coachi’, jolta saat
						kommentteja ja ideoita ajankäyttöösi.
					</Typography>
					<Typography>
						Vastasit myös, että suunnittelet työtehtäviäsi tällä
						hetkellä [kysymys 10 valitut arvot ]. Kysy itseltäsi,
						onko tämä suunnittelun aikaväli sinulle ja pohtimallesi
						muutokselle sopiva.
					</Typography>
				</Box>
			)
		},
		{
			id: 6,
			question: 5,
			condition: 'NO',
			content: (
				<Box>
					<Typography>
						Näin arvioit, että aikasi jakautuu eri työtehtävien
						välillä
					</Typography>
					<Box my={3}>tähän kuvio x [kysymys 5 valitut arvot</Box>
					<Typography>
						Muutokset ja kausivaihtelut ovat yrittäjille hyvin
						tyyppilisiä. Nyt kun aika on hallinnassa, pohdi voisitko
						varautua näihin muutoksiin jo etukäteen, esimerkiksi
						kehittämällä uutta tai syventämällä jo olemassa olevia
						taitojasi. Lisäksi voit miettiä pitkän aikavälin
						ajanhallintaa. Vastasit, että suunnittelet ajankäyttöä
						työssäsi [kysymys 10 valitut arvot ]. Kysy itseltäsi
						onko tämä mielestäsi toimiva ratkaisu tällä hetkellä ja
						pidemmällä aikavälillä. Pitkän aikavälin suunnittelu on
						hyvä palauttaa niihin tekijöihin, mitkä ovat elämässä
						tärkeitä ja mihin haluaisit panostaa enemmän.
					</Typography>
				</Box>
			)
		}
	]
}

export default summaryContent
