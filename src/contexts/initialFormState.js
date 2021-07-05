import questions from '../data/questions.json'

// Initiate the state with empty values for every question in the questions.json file
const initialFormState = questions.map((page) => {
	return {
		page: page.ID,
		answers: page.questions.map((question) => {
			switch (question.type) {
				case 'multi-text':
				case 'text':
					return {
						id: question.ID,
						value: ''
					}
				case 'range':
					return {
						id: question.ID,
						value: 5
					}
				case 'radio':
					return {
						id: question.ID,
						value: null
					}
				case 'date':
					return {
						id: question.ID,
						value: new Date()
					}
				case 'checkbox':
					return {
						id: question.ID,
						value: question.choices.map((choice) => ({
							text: choice.text,
							isChecked: false,
							ID: choice.ID
						}))
					}
				case 'tableradiobox':
					return {
						id: question.ID,
						value: []
					}
				case 'pieslider':
					return {
						id: question.ID,
						value: question.sliders.map((slider) => {
							return {
								ID: slider.ID,
								text: slider.text,
								range: 8
							}
						})
					}
				default:
					return {
						id: question.ID,
						value: ''
					}
			}
		})
	}
})

export default initialFormState
