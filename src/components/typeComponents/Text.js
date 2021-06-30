import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from '../../contexts/FormContext'
import { getAnswerByID } from '../../utils'

// Material UI
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'

const Text = ({ question }) => {
	const { handleInputChange } = useForm()

	return (
		<>
			{question.fields.map((field) => {
				return (
					<Box key={field.ID} my={2}>
						<TextField
							name={question.ID && question.ID.toString()}
							value={
								getAnswerByID(question.page, question.ID).value
							}
							onChange={(event) =>
								handleInputChange(
									event.target.name,
									event.target.value
								)
							}
							rows='4'
							variant='outlined'
							fullWidth
							label={field.text && field.text}
							InputProps={{
								multiline: true,
								rows: 4
							}}
							InputLabelProps={{
								style: {
									fontSize: '1.1rem'
								}
							}}
						/>
					</Box>
				)
			})}
		</>
	)
}

Text.propTypes = {
	question: PropTypes.object
}

export default Text
