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
	// const questionAmount = questionSets.find((page) => page.id === currentPage)
	// 	.questions.length
	// let answeredQuestions = 0
	// // Loop over each answer in the page and count the answered questions
	// formData
	// 	.find((answersPage) => answersPage.page === currentPage)
	// 	?.answers.forEach((answer) => {
	// 		switch (answer.type) {
	// 			case 'tableradiobox':
	// 				if (
	// 					answer.value.filter((row) => row.id !== 8).length === 7
	// 				) {
	// 					return answeredQuestions++
	// 				}
	// 				return null
	// 			case 'date':
	// 			case 'radio':
	// 			case 'checkbox':
	// 			case 'pieslider':
	// 				return answer.value ? answeredQuestions++ : null
	// 			default:
	// 				throw new Error('Type not found in validation...')
	// 		}
	// 	})
	// eslint-disable-next-line no-unused-vars
	let answerCounter = 0
	// eslint-disable-next-line no-unused-vars
	const fetchedQuestions = questionsToRender(currentPage)
	const questionsOnPage = formData?.find(
		(answersPage) => answersPage.page === currentPage
	)?.answers

	if (questionsOnPage && fetchedQuestions) {
		questionsOnPage.forEach((answer) => {
			if (fetchedQuestions.includes(answer.id)) {
				switch (answer.type) {
					case 'tableradiobox':
						if (
							answer.value.filter((row) => row.id !== 8)
								.length === 7
						) {
							return answerCounter++
						}
						return null
					case 'date':
					case 'radio':
					case 'checkbox':
					case 'pieslider':
						return answer.value ? answerCounter++ : null
					default:
						throw new Error('Type not found in validation...')
				}
			}
		})
	}

	return !(fetchedQuestions?.length === answerCounter)
}

export const questionsToRender = (currentPage) => {
	// Manually set questions depending on what the user answers
	switch (currentPage) {
		case 1:
			return [1]
		case 2:
			return [2]
		case 3: {
			const answerToFirstFork = getAnswerByID(2, 2)?.value?.condition
			if (answerToFirstFork === 'CONTINUE') {
				return [3, 4, 5, 6]
			} else if (answerToFirstFork === 'SKIP') {
				return [5, 6]
			} else {
				return [3, 4, 5, 6]
			}
		}
		case 4:
			return [7]
		case 5: {
			const answerToSecondFork = getAnswerByID(4, 7)?.value?.condition
			if (answerToSecondFork === 'CONTINUE') {
				return [8, 9, 10]
			} else if (answerToSecondFork === 'SKIP') {
				return [10]
			} else {
				return [8, 9, 10]
			}
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
