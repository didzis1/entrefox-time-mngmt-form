import React from 'react'
import PropTypes from 'prop-types'

// Material UI
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import useStyles from '../../styles'

const TextGauge = ({ answer }) => {
	const classes = useStyles()

	// Fill the gauge and turn the needle based on answer value
	const gaugeValues = () => {
		switch (answer) {
			case 'Heikolla tasolla':
				return { fill: 0.1, needle: -0.16 }
			case 'Kehitettävää on':
				return { fill: 0.2, needle: -0.06 }
			case 'Riittävällä tasolla':
				return { fill: 0.25, needle: 0 }
			case 'Hyvällä tasolla':
				return { fill: 0.4, needle: 0.15 }
			case 'Erinomaisella tasolla':
				return { fill: 0.5, needle: 0.25 }
		}
	}
	return (
		<>
			<Box textAlign='center' my={2}>
				<Typography variant='h6'>
					Työn, vapaa-ajan ja levon suhde elämässäsi
				</Typography>
			</Box>
			<Box className={classes.gauge}>
				<Box className={classes.gaugeBody}>
					<Box
						className={classes.gaugeFill}
						style={{
							transform: `rotate(${gaugeValues().fill}turn)`
						}}></Box>
					<Box className={classes.gaugeCover}></Box>
					<Box
						style={{
							transform: `rotate(${gaugeValues().needle}turn)`
						}}
						className={classes.gaugeNeedle}></Box>
				</Box>
				<Box align='center'>
					<Typography variant='h6'>{answer}</Typography>
				</Box>
			</Box>
		</>
	)
}

TextGauge.propTypes = {
	answer: PropTypes.string
}

export default TextGauge
