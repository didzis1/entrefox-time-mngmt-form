import React from 'react'
import { useForm } from './contexts/FormContext'
import questionSets from './data/questions.json'

import RadioButton from './components/typeComponents/RadioButton'
import Range from './components/typeComponents/Range'
import DateField from './components/typeComponents/DateField'
import CheckBox from './components/typeComponents/CheckBox'
import TableRadioBox from './components/typeComponents/TableRadioBox'
import PieSlider from './components/typeComponents/PieSlider'

export const getAnswerByID = (questionPage, questionID) => {
	const { formData } = useForm()
	// Find the page the answer is located at, then find the answer's value based on questionID

	return formData
		.find((answer) => answer.page === questionPage)
		.answers.find((answer) => answer.id === questionID)
}

// If validatedButton returns true, 'Seuraava' or 'Olen valmis' button is disabled
export const validatedButton = () => {
	const { formData, currentPage } = useForm()
	const questionAmount = questionSets.find((page) => page.id === currentPage)
		.questions.length
	let answeredQuestions = 0

	// Loop over each answer in the page and count the answered questions
	formData
		.find((answersPage) => answersPage.page === currentPage)
		?.answers.forEach((answer) => {
			switch (answer.type) {
				case 'tableradiobox':
					if (
						answer.value.filter((row) => row.id !== 8).length === 7
					) {
						return answeredQuestions++
					}
					return null
				case 'date':
				case 'radio':
				case 'checkbox':
				case 'pieslider':
					return answer.value ? answeredQuestions++ : null
				default:
					throw new Error('Type not found in validation...')
			}
		})
	// If answers are equal to or bigger than questions take off disabled button
	return !(questionAmount <= answeredQuestions)
}

const typeComponent = (question) => {
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
export default typeComponent
