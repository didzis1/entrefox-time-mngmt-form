import React, { useEffect } from 'react'
import questionSets from './data/questions.json'
import { useForm } from './contexts/FormContext'

// Components
import Survey from './components/Survey'
import Summary from './components/Summary'
import Footer from './components/Footer'

// Material UI
import Box from '@material-ui/core/Box'
import useStyles from './styles'

const App = () => {
	const {
		currentPage,
		setCurrentPage,
		formSubmitted,
		setFormSubmitted,
		formData
	} = useForm()
	const classes = useStyles()

	// Scroll to top when page is changed
	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		})
	}, [currentPage])

	const handleNextPage = () => {
		setCurrentPage(currentPage + 1)
	}

	const handlePreviousPage = () => {
		setCurrentPage(currentPage - 1)
	}

	const handleFormSubmit = (event) => {
		event.preventDefault()
		setFormSubmitted(!formSubmitted)
	}

	return (
		<Box className={classes.mainBackground}>
			<Box pt={5}>
				{formSubmitted ? (
					<Summary handleFormSubmit={handleFormSubmit} />
				) : (
					<Survey
						handleFormSubmit={handleFormSubmit}
						handleNextPage={handleNextPage}
						handlePreviousPage={handlePreviousPage}
						questionSets={questionSets}
						currentPage={currentPage}
						formSubmitted={formSubmitted}
						formData={formData}
					/>
				)}

				<Footer />
			</Box>
		</Box>
	)
}

export default App
