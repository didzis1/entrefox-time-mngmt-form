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

// eslint-disable-next-line no-unused-vars
const WorkTable = ({ present, future }) => {
	return (
		<TableContainer component={Paper}>
			<Table size='medium'>
				<TableHead>
					<TableRow>
						<StyledTableCell>Työn osa-alue</StyledTableCell>
						<StyledTableCell>Nykyhetkellä</StyledTableCell>
						<StyledTableCell>Tulevaisuudessa</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<StyledTableRow>
						<TableCell>Asiakastyöt</TableCell>
						<TableCell>Ei kulu aikaa</TableCell>
						<TableCell>Ei kulu aikaa</TableCell>
					</StyledTableRow>
					<StyledTableRow>
						<TableCell>Hallinnolliset työt</TableCell>
						<TableCell>Kuluu sopivasti aikaa</TableCell>
						<TableCell>Ei kulu aikaa</TableCell>
					</StyledTableRow>
					<StyledTableRow>
						<TableCell>Myynti ja markkinointi</TableCell>
						<TableCell>Ei jää tarpeeksi aikaa</TableCell>
						<TableCell>Ei kulu aikaa</TableCell>
					</StyledTableRow>
					<StyledTableRow>
						<TableCell>Osaamisen kehittäminen</TableCell>
						<TableCell>Kuluu liikaa aikaa</TableCell>
						<TableCell>Ei kulu aikaa</TableCell>
					</StyledTableRow>
					<StyledTableRow>
						<TableCell>Oman työn suunnittelu</TableCell>
						<TableCell>Kuluu lähes koko työaika</TableCell>
						<TableCell>Ei kulu aikaa</TableCell>
					</StyledTableRow>
					<StyledTableRow>
						<TableCell>Työtehtävien väliset siirtymät</TableCell>
						<TableCell>Kuluu sopivasti aikaa</TableCell>
						<TableCell>Ei kulu aikaa</TableCell>
					</StyledTableRow>
					<StyledTableRow>
						<TableCell>
							Tauot ja palautuminen (esim. ruokatauko, kahvitauko,
							sometauko, jumppa)
						</TableCell>
						<TableCell>Ei kulu aikaa</TableCell>
						<TableCell>Ei kulu aikaa</TableCell>
					</StyledTableRow>
					<StyledTableRow>
						<TableCell>Muu toiminta</TableCell>
						<TableCell>Kuluu liikaa aikaa</TableCell>
						<TableCell>Ei kulu aikaa</TableCell>
					</StyledTableRow>
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
