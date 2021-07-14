import questions from '../data/questions.json'

// Initiate the state with empty values for every question in the questions.json file
const initialFormState = questions.map((page) => {
	return {
		page: page.id,
		answers: page.questions.map((question) => {
			switch (question.type) {
				case 'multi-text':
				case 'radio':
					return {
						id: question.id,
						type: question.type,
						value: null
					}
				case 'date':
					return {
						id: question.id,
						type: question.type,
						value: new Date()
					}
				case 'checkbox':
					return {
						id: question.id,
						type: question.type,
						value: question.choices.map((choice) => ({
							text: choice.text,
							isChecked: false,
							id: choice.id
						}))
					}
				case 'tableradiobox':
					return {
						id: question.id,
						type: question.type,
						value: []
					}
				case 'pieslider':
					return {
						id: question.id,
						type: question.type,
						value: question.sliders.map((slider) => {
							return {
								id: slider.id,
								text: slider.text,
								range: 4
							}
						})
					}
				default:
					return {
						id: question.id,
						type: question.type,
						value: ''
					}
			}
		})
	}
})

export default initialFormState
