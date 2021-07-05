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
import Radio from '@material-ui/core/Radio'

const TableRadioBox = ({ question }) => {
	const { currentPage, handleInputChange } = useForm()
	const currentValues = getAnswerByID(currentPage, question.ID)

	const handleRadioChange = (row, column) => {
		const newValue = {
			ID: row.ID,
			row: row.text,
			answer: {
				id: column.ID,
				text: column.text
			}
		}
		const existingValue = currentValues.value.find(
			(value) => value.ID === row.ID
		)
		if (!existingValue) {
			handleInputChange(question.ID, currentValues.value.concat(newValue))
		} else {
			const updatedValues = currentValues.value.map((previousValue) =>
				previousValue.ID === row.ID ? newValue : previousValue
			)
			handleInputChange(question.ID, updatedValues)
		}
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
							{/* <RadioGroup row> */}
							{question.columns.map((column) => (
								<TableCell key={column.ID} align='center'>
									<Radio
										onChange={() =>
											handleRadioChange(row, column)
										}
										checked={
											currentValues?.value.find(
												(answer) => answer.ID === row.ID
											)?.answer.id === column.ID
										}
									/>
								</TableCell>
							))}
							{/* </RadioGroup> */}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

TableRadioBox.propTypes = {
	question: PropTypes.object
}

export default TableRadioBox
