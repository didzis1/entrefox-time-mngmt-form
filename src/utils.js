import React from 'react'

import RadioButton from './components/typeComponents/RadioButton'
import Range from './components/typeComponents/Range'
import DateField from './components/typeComponents/DateField'
import CheckBox from './components/typeComponents/CheckBox'
import TableRadioBox from './components/typeComponents/TableRadioBox'
import PieSlider from './components/typeComponents/PieSlider'

export const getAnswerByID = (questionPage, questionID, formData) => {
	// Find the page the answer is located at, then find the answer's value based on questionID
	return formData
		?.find((answer) => answer.page === questionPage)
		.answers.find((answer) => answer.id === questionID)
}

// If validatedButton returns true, 'Seuraava' or 'Olen valmis' button is disabled
export const validatedButton = (currentPage, formData) => {
	let answerCounter = 0

	const fetchedQuestions = questionsToRender(currentPage, formData)
	const questionsInJSON = formData?.find(
		(answersPage) => answersPage.page === currentPage
	)?.answers

	if (!fetchedQuestions || !questionsInJSON) {
		return null
	}

	questionsInJSON.forEach((answer) => {
		if (fetchedQuestions.includes(answer.id)) {
			if (answer.type === 'tableradiobox') {
				if (answer.value.filter((row) => row.id !== 8).length === 7) {
					return answerCounter++
				}
				return null
			} else {
				return answer.value ? answerCounter++ : null
			}
		}
	})

	return !(fetchedQuestions?.length === answerCounter)
}

export const questionsToRender = (currentPage, formData) => {
	// Manually set questions depending on what the user answers
	switch (currentPage) {
		case 1:
			return [1]
		case 2:
			return [2]
		case 3: {
			// Get the second question's condition
			const answerToFirstFork = getAnswerByID(2, 2, formData)?.value
				?.condition

			// Return questions that need to be rendered based on answer
			if (answerToFirstFork === 'YES' || answerToFirstFork === 'MAYBE') {
				return [3, 4, 5, 6]
			} else if (answerToFirstFork === 'NO') {
				return [6]
			}
			return null
		}
		case 4:
			return [7]
		case 5: {
			// Get the seventh question's condition
			const answerToSecondFork = getAnswerByID(4, 7, formData)?.value
				?.condition

			// Return questions that need to be rendered based on answer
			if (
				answerToSecondFork === 'YES' ||
				answerToSecondFork === 'MAYBE'
			) {
				return [8, 9, 10, 11]
			} else if (answerToSecondFork === 'NO') {
				return [10, 11]
			}
			return null
		}
		default:
			break
	}
}

export const typeComponent = (question) => {
	// Each question returns it's corresponding component
	// Type is assigned in questions.json for each question
	switch (question.type) {
		case 'radio':
			return <RadioButton question={question} />
		case 'range':
			return <Range question={question} />
		case 'date':
			return <DateField question={question} />
		case 'tableradiobox':
			return <TableRadioBox question={question} />
		case 'checkbox':
			return <CheckBox question={question} />
		case 'pieslider':
			return <PieSlider question={question} />
		default:
			throw new Error('Type not found...')
	}
}

// Convert date to dd.MM.YYYY format
export const dateToYMD = (date) => {
	return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
}
