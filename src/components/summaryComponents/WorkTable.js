import React from 'react'
import PropTypes from 'prop-types'

// Material UI
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

const StyledTableCell = withStyles(() => ({
	head: {
		backgroundColor: 'rgba(205,220,57,0.85)',
		color: '#00000'
	},
	body: {
		fontSize: 14
	}
}))(TableCell)

const StyledTableRow = withStyles(() => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: 'rgba(255,235,59,0.15)'
		},
		'&:nth-of-type(even)': {
			backgroundColor: 'RGBA(251,192,45,0.05)'
		}
	}
}))(TableRow)

const WorkTable = ({ present, future }) => {
	// Present = answer for question 6
	// Future = answer for question 10
	// If there is no answer for question 10 (future props), table has only two columns instead of three
	return (
		<TableContainer component={Paper}>
			<Table size='medium'>
				<TableHead>
					<TableRow>
						<StyledTableCell>Työn osa-alue</StyledTableCell>
						<StyledTableCell>Nykyhetkellä</StyledTableCell>
						{future ? (
							<StyledTableCell>Tulevaisuudessa</StyledTableCell>
						) : null}
					</TableRow>
				</TableHead>
				<TableBody>
					{present?.value.map((presentAnswer) => {
						return (
							<StyledTableRow key={presentAnswer.id}>
								<TableCell>
									{presentAnswer.row.replaceAll('*', '')}
								</TableCell>
								<TableCell>
									{presentAnswer?.answer.text}
								</TableCell>
								{future ? (
									<TableCell>
										{future?.value.find(
											(futureAnswer) =>
												futureAnswer.id ===
												presentAnswer.id
										)?.answer.text || ''}
									</TableCell>
								) : null}
							</StyledTableRow>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

WorkTable.propTypes = {
	present: PropTypes.object,
	future: PropTypes.object
}

export default WorkTable
