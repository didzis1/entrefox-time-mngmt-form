import React from 'react'
import PropTypes from 'prop-types'
import typeComponent from '../utils'

// Material UI
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

// eslint-disable-next-line no-unused-vars
const questionsToDisplay = (first, second) => {
	if (
		(first === 'YES' && second === 'YES') ||
		(first === 'MAYBE' && second === 'MAYBE')
	) {
		// YES, YES or MAYBE, MAYBE
		return [3, 4, 5, 6, 8, 9, 10]
	} else if (first === 'NO' && second === 'NO') {
		// NO, NO
		return 'both no'
	} else if (first === 'YES' && second === 'NO') {
		// YES, NO
		return 'first yes, second no'
	} else if (first === 'NO' && second === 'YES') {
		// NO, YES
		return 'first no, second yes'
	} else if (first === 'MAYBE' && second === 'YES') {
		// MAYBE, YES
		return 'first maybe, second yes'
	} else if (first === 'MAYBE' && second === 'NO') {
		// MAYBE, NO
		return 'first maybe, second no'
	} else if (first === 'YES' && second === 'MAYBE') {
		// YES, MAYBE
		return 'first yes, second maybe'
	} else if (first === 'NO' && second === 'MAYBE') {
		// NO, MAYBE
		return 'first no, second maybe'
	}
}

const Question = ({ questions, page }) => {
	// Render all questions on page
	return (
		<>
			{questions.map((question) => (
				<Box key={question.ID} mt={5}>
					<Typography variant='h5'>{question.title}</Typography>
					{question.description && (
						<Box fontStyle='italic' mt={2}>
							<Typography variant='body1'>
								{question.description}
							</Typography>
						</Box>
					)}
					{/* Component is determined based on it's type in typeComponent */}
					{typeComponent({ ...question, page })}
				</Box>
			))}
		</>
	)
}

Question.propTypes = {
	questions: PropTypes.array,
	page: PropTypes.number
}

export default Question
