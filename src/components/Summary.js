import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from '../contexts/FormContext'
import { getAnswerByID } from '../utils'

// Summary components
import ButtonHandler from './ButtonHandler'
import ChartBars from './summaryComponents/ChartBars'
import NumberGauge from './summaryComponents/NumberGauge'
import TextGauge from './summaryComponents/TextGauge'
import StickyNote from './summaryComponents/StickyNote'
import GoalsPaper from './summaryComponents/GoalsPaper'

// Material UI
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import useStyles from '../styles'
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded'
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded'

// Images
import entrefox_stocks from '../images/summaryImages/entrefox_stocks.png'
import entrefox_business from '../images/summaryImages/entrefox_business.png'
import entrefox_pdf_bg from '../images/background/pdf_background.png'

import html2pdf from 'html2pdf.js'

// Convert date to dd.MM.YYYY format
const dateToYMD = (date) => {
	return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
}

const Summary = ({ handleFormSubmit }) => {
	const classes = useStyles()
	const { formData } = useForm()

	// Get todays date
	const currentDate = dateToYMD(new Date())

	// Value for question 7 (in variable, since used in multiple places)
	const sliderValue = getAnswerByID(3, 7)

	// Check if user remembers the date he last answered the survey (Page 2 - Question 2)
	let previouslyDoneSurvey
	if (typeof getAnswerByID(2, 2) === 'object') {
		previouslyDoneSurvey =
			'Olet edellisen kerran tehnyt kehityskeskustelun ' +
			dateToYMD(getAnswerByID(2, 2)) +
			'.'
	} else {
		previouslyDoneSurvey =
			'Olet ennen tehnyt kehityskeskustelun, mutta tarkka päivämäärä ei ole tiedossa.'
	}

	const questionEight = getAnswerByID(3, 8)

	const questionNine = (answer) => {
		switch (answer) {
			case 'Teen tehtäviäni yleensä sitä mukaa, kun niitä ilmestyy.':
				return 'Hoidat työtehtäväsi sitä mukaa, kun niitä ilmestyy. '
			case 'Teen yleensä töistäni aikataulun, jota pyrin noudattamaan.':
				return 'Teet töistäsi aikataulun, jota pyrit noudattamaan. '
			case 'Suunnittelen ja priorisoin säännöllisesti työtehtäväni keskittyen olennaiseen.':
				return 'Suunnittelet ja priorisoit säännöllisesti työtehtäväsi keskittyen olennaiseen. '
		}
	}

	const questionEleven = (answer) => {
		switch (answer) {
			case 'En tiedä lainkaan, kuinka hyödyntää digitaalisia työkaluja (esim. sovelluksia, ohjelmia, verkkosivuja) yrityksessäni.':
				return 'et tiedä lainkaan, kuinka hyödyntää digitaalisia työkaluja (esim. sovelluksia, ohjelmia, verkkosivuja) yrityksessäsi.'
			case 'Tiedän, millaisia digitaalisia työkaluja voisin hyödyntää yrityksessäni ja olen kokeillut muutamia.':
				return 'tiedät, millaisia digitaalisia työkaluja voisit hyödyntää yrityksessäsi ja olet kokeillut muutamia.'
			case 'Osaan käyttää useita digitaalisia työkaluja sekä hyödyntää niiden ominaisuuksia.':
				return 'osaat käyttää useita digitaalisia työkaluja sekä hyödyntää niiden ominaisuuksia.'
			case 'Seuraan aktiivisesti erilaisten digitaalisten palvelujen kehittymistä ja otan uusia työkaluja käyttöön tarpeen mukaan.':
				return 'seuraat aktiivisesti erilaisten digitaalisten palvelujen kehittymistä ja otat uusia työkaluja käyttöön tarpeen mukaan.'
			case 'Teen yleensä töistäni aikataulun, jota pyrin noudattamaan.':
				return 'teet yleensä töistäsi aikataulun, jota pyrit noudattamaan.'
		}
	}

	const downloadPDF = async () => {
		// scrolling up is necessary in order for the PDF to load correctly
		await window.scrollTo({
			top: 0,
			left: 0
		})

		// Select and clone elements that are to be edited for the PDF
		const element = document.getElementById('summary').cloneNode(true)
		const lastPage = document.getElementById('last-pdf-page').cloneNode(true)

		// Style settings for cloned elements
		// PDF page size: [215.9mm x 279.4mm]
		lastPage.style.height = '972px'
		element.style.backgroundImage = `url(${entrefox_pdf_bg})`
		element.style.backgroundSize = '100% 279.4mm'
		element.style.backgroundRepeat = 'repeat-y'
		element.style.padding = '15px 100px 0px 100px'

		// Options for the html2pdf rendering
		const opt = {
			filename: 'entrefox_summary.pdf',
			image: { type: 'jpeg' },
			html2canvas: {
				scale: 2,
				scrollX: -window.scrollX,
				scrollY: -window.scrollY,
				windowWidth: document.documentElement.offsetWidth,
				windowHeight: document.documentElement.offsetHeight
			},
			jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' },
			pagebreak: { mode: ['avoid-all', 'css', 'legacy', 'whiteline'] }
		}

		// Generate the PDF from the defined options
		window.open(await html2pdf().from(element).set(opt).output('bloburl'))

		// Change the padding back after PDF has been generated
		lastPage.style.height = 'auto'
		element.style.padding = ''
		element.style.backgroundImage = ''
		element.style.backgroundSize = ''
	}

	return (
		<Container className={classes.survey} maxWidth='md'>
			<ButtonHandler
				text='Palaa takaisin'
				colors={{ bg: '#cddc39', bgHover: '#c0ca33' }}
				handlePagination={handleFormSubmit}
			/>
			<Box id='summary'>
				{/* Header with EntreFox logo */}
				<Box my={5}>
					<Typography
						component='h1'
						variant='h3'
						color='primary'
						align='center'>
						Yrittäjän
					</Typography>
					<Typography
						variant='h4'
						component='h1'
						align='center'
						gutterBottom>
						kehityskeskustelun koonti
					</Typography>
					<Box align='center'>
						<img
							src={entrefox_business}
							className={classes.headingImage}
						/>
					</Box>
					<Typography variant='h6' align='center'>
						Olet käynyt kehityskeskustelun {currentDate}.
					</Typography>
				</Box>
				<Divider />

				{/* Manual page-break for the PDF generation */}
				<div className='html2pdf__page-break'></div>

				{/* Page 3: Questions ID 5 - 11 */}
				<Box mt={10} mb={5}>
					<Typography variant='h5' className={classes.heading}>
						Tietoisuus nykyhetkellä
					</Typography>
					{/* Questions 5-6 */}
					<Typography variant='body1'>
						Arvioit voimavarojesi olevan yrittäjänä{' '}
						{getAnswerByID(3, 5).toLowerCase()} ja voimavaroissa
						olevan {getAnswerByID(3, 6).toLowerCase()} suhteessa
						tulevaisuuden tarjoamiin vaatimuksiin ja
						mahdollisuuksiin.
					</Typography>
					{/* Chart for questions */}
					<Box mt={3}>
						<ChartBars answers={formData} />
					</Box>
				</Box>

				{/* Manual page-break for the PDF generation */}
				<div className='html2pdf__page-break'></div>

				{/* Question 7 */}
				<Box my={10}>
					<Typography variant='body1'>
						Arvioit työkykysi olevan asteikolla 1-10 tasolla{' '}
						{sliderValue}. Yrittäjän on tärkeää pitää huolta
						yrityksen pyörittämisen lisäksi myös itsestään, sillä
						hyvinvoiva yritys lähtee hyvinvoivasta yrittäjästä.
						Olemme koonneet{' '}
						<a
							className={classes.linkTag}
							target='blank'
							href='https://www.entrefox.fi/terveyskunto-ja-sen-kehittaminen/'>
							tietoa terveyskunnosta
						</a>
						, käy halutessasi hakemassa vinkkejä hyvinvointisi
						kehittämiseen ja ylläpitämiseen.
					</Typography>
					<Box mt={5}>
						{/* Gauge for question 7 */}
						<NumberGauge answer={sliderValue} />
					</Box>
				</Box>

				{/* Question 8 - 9 */}
				<Box mt={10}>
					<Typography variant='body1'>
						Arviosi mukaan työ, vapaa-aika ja lepo ovat tasapainossa
						elämässäsi{' '}
						<i>
							{questionEight.toLowerCase().split(' ')[0]} tavalla
						</i>
						. {questionNine(getAnswerByID(3, 9))}
						Voit syventyä ajankäyttöösi ja tutustua vinkkeihimme{' '}
						<a
							className={classes.linkTag}
							target='blank'
							href='https://www.entrefox.fi/ajanhallinta/'>
							ajanhallinnan teemassa
						</a>
						.
					</Typography>
					<Box mt={5}>
						<TextGauge answer={questionEight} />
					</Box>
				</Box>

				{/* Manual page-break for the PDF generation */}
				<div className='html2pdf__page-break'></div>

				{/* Question 11 */}
				<Box mt={10} mb={2}>
					<Typography variant='body1'>
						Digitaalisten työkalujen osalta{' '}
						<Box component='span' fontStyle='italic'>
							{questionEleven(getAnswerByID(3, 11))}
						</Box>{' '}
						<a
							className={classes.linkTag}
							target='blank'
							href='https://www.entrefox.fi/yrittajan-osaamiskartoitus/'>
							Osaamisen teemassamme
						</a>{' '}
						on käsitelty yrittäjän monipuolisia osaamisalueita.
					</Typography>
				</Box>
				{/* Question 10 */}
				<Box mb={10}>
					<Typography variant='body1'>
						Työhösi liittyvistä tiedoista ja taidoista kerroit
						seuraavasti:
					</Typography>
					<Box my={4}>
						<StickyNote answer={getAnswerByID(3, 10)} />
					</Box>
				</Box>

				{/* Manual page-break for the PDF generation */}
				<div className='html2pdf__page-break'></div>

				{/* Element wont be visible on the PDF */}
				<Divider data-html2canvas-ignore='true' />

				{/* Page 4: Question 12 (Possible multiple fields in one question) */}
				<Box my={10}>
					<Box mb={3}>
						<Typography variant='h5' className={classes.heading}>
							Tehdyt valinnat
						</Typography>
					</Box>
					<Box mb={10}>
						<Typography variant='body1'>
							Valitsit seuraavat asiat, joihin haluat panostaa
							tulevan puolen vuoden aikana osaamisesi ja/tai
							hyvinvointisi kehittämiseksi.
						</Typography>
					</Box>
					{/* Paper with EntreFox badge including fields in question 12 */}
					<GoalsPaper answers={getAnswerByID(4, 12)} />
				</Box>

				{/* Element wont be visible on the PDF */}
				<Divider data-html2canvas-ignore='true' />

				{/* Manual page-break for the PDF generation */}
				<div className='html2pdf__page-break'></div>
				<Box id='last-pdf-page'>
					{/* No questions - info text with image */}
					<Box my={10}>
						<Box mb={3}>
							<Typography
								variant='h5'
								className={classes.heading}>
								Seuraa tilannettasi ja muuta kurssia
								tarvittaessa
							</Typography>
						</Box>
						<Grid
							container
							direction='row'
							justify='space-around'
							alignItems='flex-start'>
							<Grid item xs={8} md={10}>
								<Typography variant='body1'>
									Seuraa kehittymistäsi, mutta muista
									kuunnella itseäsi matkan varrella. Onko
									tavoitteet edelleen oikeat, vai tarvitseeko
									kurssia muuttaa?
								</Typography>
							</Grid>
							<Grid item xs={4} md={2}>
								<Box align='center'>
									<img
										className={classes.summaryImage}
										src={entrefox_stocks}
										alt='Kuva kurssin seurannasta'
									/>
								</Box>
							</Grid>
						</Grid>
					</Box>

					{/* Element wont be visible on the PDF */}
					<Divider data-html2canvas-ignore='true' />

					{/* Extra part of the survey - ONLY IF USER ANSWERED YES TO FIRST QUESTION */}
					{/* Page 2 - Questions 2-4 */}
					{getAnswerByID(1, 1) === 'Kyllä' ? (
						<Box my={10}>
							<Box mb={3}>
								<Typography
									variant='h5'
									className={classes.heading}>
									Edellinen kehityskeskustelu
								</Typography>
							</Box>
							<Typography variant='body1'>
								{previouslyDoneSurvey} <br />
							</Typography>
							<Box mt={2}>
								<Typography variant='h6'>
									{' '}
									Edellisellä kerralla asetit itsellesi nämä
									tavoitteet ja askelmerkit:
								</Typography>
							</Box>

							<Box className={classes.textBorder} mb={2}>
								<Typography variant='body1'>
									{getAnswerByID(2, 3)}
								</Typography>
							</Box>

							<Typography variant='h6'>
								Tavoitteesi toteutuivat:
							</Typography>
							<Box>
								<Typography variant='body1'>
									{getAnswerByID(2, 4)}
								</Typography>
							</Box>
						</Box>
					) : null}
				</Box>
				{/* Element wont be visible on the PDF */}
				<Divider data-html2canvas-ignore='true' />
			</Box>
			<Box mt={2}>
				<Grid
					container
					direction='row'
					justify='space-between'
					alignItems='center'>
					<Grid item xs={12} sm={3}>
						<Box>
							<ButtonHandler
								text='Lataa PDF'
								colors={{ bg: '#cddc39', bgHover: '#c0ca33' }}
								startIcon={<GetAppRoundedIcon />}
								handlePagination={downloadPDF}
							/>
						</Box>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Box mt={2} mb={1}>
							<ButtonHandler
								href='https://www.entrefox.fi/kehityskeskustelu/'
								text='Päätä kehityskeskustelu'
								startIcon={<CheckCircleOutlineRoundedIcon />}
								colors={{
									bg: '#ffeb3b',
									bgHover: '#fbc02d'
								}}
							/>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Container>
	)
}

Summary.propTypes = {
	handleFormSubmit: PropTypes.func
}

export default Summary
