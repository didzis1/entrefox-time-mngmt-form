import React from 'react'
import PropTypes from 'prop-types'

// Material UI
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import useStyles from '../../styles'

const NumberGauge = ({ answer }) => {
	const classes = useStyles()
	return (
		<>
			<Box textAlign='center' my={2}>
				<Typography variant='h6'>Työkyky</Typography>
			</Box>
			<Grid
				container
				direction='row'
				justify='center'
				className={classes.gaugeGrid}>
				<Grid
					item
					container
					direction='column'
					justify='flex-end'
					alignItems='flex-end'
					xs={1}>
					<Box className={classes.gaugeLabel}>
						<Typography variant='h6'>1</Typography>
					</Box>
				</Grid>
				<Grid item container direction='column' xs={10}>
					<Box className={classes.gauge}>
						<Box className={classes.gaugeBody}>
							<Box
								className={classes.gaugeFill}
								style={{
									transform: `rotate(${0.05 * answer}turn)`
								}}></Box>
							<Box className={classes.gaugeCover}>
								<Typography variant='h2'>{answer}</Typography>
							</Box>
						</Box>
					</Box>
				</Grid>
				<Grid
					item
					container
					direction='column'
					justify='flex-end'
					alignItems='flex-start'
					xs={1}>
					<Box className={classes.gaugeLabel}>
						<Typography variant='h6'>10</Typography>
					</Box>
				</Grid>
			</Grid>
		</>
	)
}

NumberGauge.propTypes = {
	answer: PropTypes.number
}

export default NumberGauge
