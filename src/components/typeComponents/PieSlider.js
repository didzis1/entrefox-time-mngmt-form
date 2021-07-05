import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { getAnswerByID } from '../../utils'
import { useForm } from '../../contexts/FormContext'

// Material UI
import Slider from '@material-ui/core/Slider'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const CustomSlider = withStyles({
	root: {
		color: 'primary',
		maxWidth: '400px',
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

const PieSlider = ({ question }) => {
	const [max, setMaxValue] = useState(8)
	const { currentPage, handleInputChange } = useForm()
	const allValues = getAnswerByID(currentPage, question.ID)

	// eslint-disable-next-line no-unused-vars
	const calculateDifference = (slider) => {
		let maxValue = 0
		allValues.value.forEach((existingSlider) => {
			if (existingSlider.ID !== slider.ID) {
				maxValue += existingSlider.range
			}
		})
		setMaxValue(24 - parseInt(maxValue))
	}

	const handleSliderChange = (newValue, slider) => {
		const updatedValues = allValues.value.map((prevSlider) => {
			return {
				ID: prevSlider.ID,
				text: prevSlider.text,
				range: prevSlider.ID === slider.ID ? newValue : prevSlider.range
			}
		})
		handleInputChange(question.ID, updatedValues)
		calculateDifference(slider)
	}

	return (
		<Box align='center'>
			{question.sliders.map((slider) => {
				return (
					<Box key={slider.ID}>
						<Typography>{slider.text}</Typography>
						<CustomSlider
							aria-labelledby='discrete-slider'
							color='primary'
							min={1}
							max={max}
							name={slider.ID.toString()}
							onChange={(event, newValue) =>
								handleSliderChange(newValue, slider)
							}
							value={
								allValues?.value.find(
									(answer) => answer.ID === slider.ID
								).range
							}
						/>
						{
							allValues?.value.find(
								(answer) => answer.ID === slider.ID
							).range
						}
					</Box>
				)
			})}
		</Box>
	)
}

PieSlider.propTypes = {
	question: PropTypes.object
}

export default PieSlider
