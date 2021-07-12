import React from 'react'
import PropTypes from 'prop-types'
import { questionsToRender } from '../utils'

import Question from './Question'

const Parts = ({ questionSets, currentPage, formData }) => {
	// Get all questions that are located on currentPage
	const questionsInCurrentPage = questionSets.find(
		(page) => page.id === currentPage
	).questions

	// Fetch filtered questions
	const fetchedQuestions = questionsToRender(currentPage, formData)

	// Render questions from questionsInPage with fetchedQuestions question ID's
	return questionsInCurrentPage.map((question) =>
		fetchedQuestions.includes(question.id) ? (
			<Question key={question.id} question={question} />
		) : null
	)
}

Parts.propTypes = {
	questionSets: PropTypes.array,
	currentPage: PropTypes.number
}

export default Parts
