import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from '../../contexts/FormContext'
import { getAnswerByID } from '../../utils'

//Material UI
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'

const TableCheckBox = ({ question }) => {
	const { currentPage, handleInputChange } = useForm()
	const currentValues = getAnswerByID(currentPage, question.ID)

	const handleCheckBox = (event, rowID, column) => {
		// Create a new object for checked column
		const checkedColumn = {
			ID: column.ID,
			text: column.text,
			isChecked: event.target.checked
		}
		// Loop over all values, replace old column with new values
		const newValues = currentValues.value.map((row) => {
			if (row.ID === rowID) {
				return {
					ID: row.ID,
					text: row.text,
					choices: row.choices.map((choice) =>
						choice.ID === column.ID ? checkedColumn : choice
					)
				}
			}
			return row
		})

		// Update the state
		handleInputChange(question.ID, newValues)
	}

	// Handle the Checkbox rendering
	const renderCheckBox = (column, row) => {
		return (
			<Checkbox
				onChange={(event) => handleCheckBox(event, row.ID, column)}
				name={row.text}
				inputProps={{ 'aria-label': row.text }}
				color='primary'
			/>
		)
	}
	return (
		<TableContainer component={Paper}>
			<Table aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						{question.columns.map((column) => (
							<TableCell key={column.ID} align='center'>
								{column.text}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{question.rows.map((row) => (
						<TableRow key={row.ID}>
							<TableCell component='th' scope='row'>
								{row.text}
							</TableCell>
							{question.columns.map((column) => (
								<TableCell key={column.ID} align='center'>
									{renderCheckBox(column, row)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

TableCheckBox.propTypes = {
	question: PropTypes.object
}

export default TableCheckBox
