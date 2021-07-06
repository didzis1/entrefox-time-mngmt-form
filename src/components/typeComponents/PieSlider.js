import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from '../../contexts/FormContext'

// Material UI
import Slider from '@material-ui/core/Slider'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
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

const PieSlider = ({ question }) => {
	const { handleInputChange } = useForm()
	const initialValues = question.sliders.map((slider) => {
		return {
			ID: slider.ID,
			text: slider.text,
			range: 4
		}
	})

	const [sliderValues, setSliderValues] = useState(initialValues)
	const calculateSliderSum = (ID) => {
		let maxValue = 0
		sliderValues.forEach((value) => {
			if (value.ID !== ID) {
				maxValue += value.range
			}
		})
		return maxValue
	}

	const updateSliderValues = (event, newValue, slider) => {
		const maxTotal = 24
		const sum = calculateSliderSum(slider.ID)
		if (sum + newValue > maxTotal) {
			event.preventDefault()
			return false
		}
		const newSliderValue = {
			ID: slider.ID,
			text: slider.text,
			range: newValue
		}
		setSliderValues(
			sliderValues.map((val) =>
				val.ID === slider.ID ? newSliderValue : val
			)
		)
	}

	const handleSliderDispatch = () => {
		handleInputChange(question.ID, sliderValues)
	}

	return (
		<Box align='left' my={4}>
			{question.sliders.map((slider) => {
				return (
					<Box key={slider.ID}>
						<Grid container direction='column'>
							<Grid item>
								<Typography variant='h6'>
									{slider.text}
								</Typography>
							</Grid>
							<Grid item>
								<CustomSlider
									aria-label={slider.text}
									valueLabelDisplay='auto'
									value={
										sliderValues?.find(
											(val) => val.ID === slider.ID
										).range
									}
									name={slider.ID.toString()}
									min={0}
									max={24}
									onChange={(event, newValue) =>
										updateSliderValues(
											event,
											newValue,
											slider
										)
									}
									onChangeCommitted={() =>
										handleSliderDispatch()
									}
									color='primary'
								/>
							</Grid>
						</Grid>
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
