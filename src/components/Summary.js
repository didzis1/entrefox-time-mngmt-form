import React from 'react'
import PropTypes from 'prop-types'
import { dateToYMD } from '../utils'

// Summary components
import SummaryContent from './summaryComponents/SummaryContent'
import ButtonHandler from './ButtonHandler'

// Material UI
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import useStyles from '../styles'

// Images
import header from '../images/summary/header.png'
import entrefox_pdf_bg from '../images/background/pdf_background.png'

import html2pdf from 'html2pdf.js'

const Summary = ({ handleFormSubmit }) => {
	const classes = useStyles()

	//const firstPart = content.find((part) => part.question === 2 && part.condition)
	// Get todays date
	const currentDate = dateToYMD(new Date())

	const downloadPDF = async () => {
		// scrolling up is necessary in order for the PDF to load correctly
		await window.scrollTo({
			top: 0,
			left: 0
		})

		// Select and clone elements that are to be edited for the PDF
		const element = document.getElementById('summary').cloneNode(true)
		const lastPage = document
			.getElementById('last-pdf-page')
			.cloneNode(true)

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

	// Get first two conditions
	// Map over the function and get in the array first two texts from conditions

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
						ajanhallinnan koonti
					</Typography>
					<Box mt={2} align='center'>
						<img src={header} className={classes.headingImage} />
					</Box>
					<Typography variant='h6' align='center'>
						Olet käynyt kehityskeskustelun {currentDate}.
					</Typography>
				</Box>
				<Divider />

				<Box id='last-pdf-page' my={4}>
					<SummaryContent />
				</Box>
			</Box>
			<ButtonHandler
				text='Lataa PDF'
				colors={{ bg: '#cddc39', bgHover: '#c0ca33' }}
				handlePagination={downloadPDF}
			/>
		</Container>
	)
}

Summary.propTypes = {
	handleFormSubmit: PropTypes.func
}

export default Summary
