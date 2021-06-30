import React from 'react'
import PropTypes from 'prop-types'

// Material UI
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import useStyles from '../../styles'

const graphValues = [
	{
		percentage: 20,
		text: 'Heikolla tasolla'
	},
	{
		percentage: 40,
		text: 'Kehitettävää on'
	},
	{
		percentage: 60,
		text: 'Riittävällä tasolla'
	},
	{
		percentage: 80,
		text: 'Hyvällä tasolla'
	},
	{
		percentage: 100,
		text: 'Erinomaisella tasolla'
	}
]

const Bar = ({ answers }) => {
	const classes = useStyles()
	const barItems = answers.find((answersPage) => answersPage.page === 3)
	const barOne = barItems.answers.find((answer) => answer.id === 5)
	const barTwo = barItems.answers.find((answer) => answer.id === 6)
	return (
		<>
			{graphValues.map((value) => {
				return (
					<Box key={value.percentage}>
						<Grid
							container
							justify='center'
							align-items='center'
							direction='row'
							className={classes.mainGrid}>
							<Grid
								container
								item
								direction='column'
								justify='center'
								alignItems='flex-start'
								xs={4}
								sm={2}
								className={classes.chartLabel}>
								<Typography variant='subtitle2'>
									{value.text}
								</Typography>
							</Grid>
							<Grid
								container
								direction='column'
								item
								justify='space-around'
								xs={8}
								sm={10}
								className={classes.gridItem}>
								{value.text === barOne.value ? (
									<Box
										className={classes.chartBar}
										style={{
											width: `${value.percentage}%`,
											background: '#cddc39',
											border: '1px solid #c0ca33'
										}}></Box>
								) : (
									<Box
										className={classes.chartBar}
										style={{
											width: `${value.percentage}%`
										}}></Box>
								)}
								{value.text === barTwo.value ? (
									<Box
										className={classes.chartBar}
										style={{
											width: `${value.percentage}%`,
											background: '#ffeb3b',
											border: '1px solid #fbc02d'
										}}></Box>
								) : (
									<Box
										className={classes.chartBar}
										style={{
											width: `${value.percentage}%`
										}}></Box>
								)}
							</Grid>
						</Grid>
					</Box>
				)
			})}
			<Grid container direction='row'>
				<Grid
					container
					item
					direction='row'
					justify='center'
					alignItems='center'>
					<Box
						className={`${classes.labelBox} ${classes.limeBox}`}></Box>
					<Typography variant='body2'>
						Voimavarat nykyhetkellä
					</Typography>
				</Grid>
				<Grid
					container
					item
					direction='row'
					justify='center'
					alignItems='center'
					wrap='nowrap'>
					<Grid item>
						<Box
							className={`${classes.labelBox} ${classes.yellowBox}`}></Box>
					</Grid>
					<Grid item>
						<Typography variant='body2'>
							Voimavarat suhteessa tulevaisuuteen
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}

Bar.propTypes = {
	answers: PropTypes.array
}

export default Bar
