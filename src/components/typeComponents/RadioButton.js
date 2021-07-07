import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from '../../contexts/FormContext'
import { getAnswerByID } from '../../utils'

// Material UI
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Box from '@material-ui/core/Box'

const RadioButton = ({ question }) => {
	const { handleInputChange } = useForm()
	// console.log(getAnswerByID(question.page, question.ID))
	return (
		<Box mt={2}>
			<RadioGroup
				value={getAnswerByID(question.page, question.id).value ?? null}
				name={question.id.toString()}
				onChange={(event) =>
					handleInputChange(event.target.name, event.target.value)
				}>
				{question.choices.map((choice) => (
					<Box key={choice.id}>
						<FormControlLabel
							value={choice.text}
							control={
								<Radio
									name={question.id.toString()}
									color='primary'
								/>
							}
							label={choice.text}
						/>
						<hr style={{ opacity: 0.25 }} />
					</Box>
				))}
			</RadioGroup>
		</Box>
	)
}

RadioButton.propTypes = {
	question: PropTypes.object
}

export default RadioButton
