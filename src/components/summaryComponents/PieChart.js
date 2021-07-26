import React from 'react'
import PropTypes from 'prop-types'
import { Pie } from 'react-chartjs-2'

// Material UI
import Box from '@material-ui/core/Box'

const PieChart = ({ answer }) => {
	if (answer) {
		const data = {
			labels: answer.map((slider) => slider.text),
			datasets: [
				{
					label: 'Ajankäytön piirakkakuvio',
					data: answer.map((slider) => slider.range),
					backgroundColor: [
						'rgba(224, 247, 17, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(79, 247, 17, 0.2)'
					],
					borderColor: [
						'rgba(255, 99, 132, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)'
					],
					borderWidth: 2
				}
			]
		}

		return (
			<Box>
				<Pie data={data} />
			</Box>
		)
	}
	return null
}

PieChart.propTypes = {
	answer: PropTypes.array
}

export default PieChart
