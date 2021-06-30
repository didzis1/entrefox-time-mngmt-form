import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from '../../contexts/FormContext'
import { getAnswerByID } from '../../utils'

// Material UI
import Slider from '@material-ui/core/Slider'
import Box from '@material-ui/core/Box'
import { withStyles } from '@material-ui/core/styles'

const CustomSlider = withStyles({
	root: {
		color: 'primary',
		height: 8
	},
	thumb: {
		height: 24,
		width: 24,
		backgroundColor: '#FFFFFF',
		border: '2px solid currentColor',
		marginTop: -8,
		marginLeft: -12,
		'&:focus, &:hover, &$active': {
			boxShadow: 'inherit'
		}
	},
	active: {},
	valueLabel: {
		left: 'calc(-50% + 4px)'
	},
	track: {
		height: 10,
		borderRadius: 4
	},
	rail: {
		height: 8,
		borderRadius: 4,
		backgroundColor: 'secondary'
	}
})(Slider)

const Range = ({ question }) => {
	const { handleInputChange } = useForm()
	return (
		<Box my={4}>
			<CustomSlider
				aria-labelledby='discrete-slider'
				valueLabelDisplay='auto'
				value={getAnswerByID(question.page, question.ID)}
				name={question.ID.toString()}
				marks={question.marks}
				min={question.choices.min}
				max={question.choices.max}
				step={question.step}
				// 'event' required!
				onChange={(event, newValue) => handleInputChange(
					question.ID,
					newValue
				)}
				color='primary'
			/>
		</Box>
	)
}

Range.propTypes = {
	question: PropTypes.object
}

export default Range
