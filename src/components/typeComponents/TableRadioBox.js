import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from '../../contexts/FormContext'
import { getAnswerByID } from '../../utils'

//Material UI
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Radio from '@material-ui/core/Radio'
import TextField from '@material-ui/core/TextField'

const TableRadioBox = ({ question }) => {
	const { currentPage, handleInputChange } = useForm()
	const currentValues = getAnswerByID(currentPage, question.id)
	if (!currentValues) {
		return <p>Loading...</p>
	}
	const handleRadioChange = (row, column) => {
		const existingValue = currentValues.value.find(
			(value) => value.id === row.id
		)

		if (!existingValue) {
			const newValue = {
				id: row.id,
				row: row.text,
				answer: {
					id: column.id,
					text: column.text
				}
			}

			handleInputChange(question.id, currentValues.value.concat(newValue))
		} else {
			const rowToUpdate = {
				...existingValue,
				answer: {
					id: column.id,
					text: column.text
				}
			}
			console.log(existingValue)
			console.log(rowToUpdate)
			const updatedValues = currentValues.value.map((previousValue) =>
				previousValue.id === row.id ? rowToUpdate : previousValue
			)
			handleInputChange(question.id, updatedValues)
		}
	}

	const handleTextChange = (event, lastField) => {
		const newValue = {
			...lastField,
			textAnswer: {
				id: event.target.name,
				text: event.target.value
			}
		}
		const updatedValues = currentValues.value.map((previousValue) =>
			previousValue.id === newValue.id ? newValue : previousValue
		)
		handleInputChange(question.id, updatedValues)
	}

	const isOtherAnswered = () => {
		const lastField = currentValues?.value.find((row) => row.id === 8)
		if (lastField) {
			return (
				<Box my={1}>
					<Typography variant='h6'>
						{
							'Valitsit edellisessä kysymyksessä kohdan "Muu toiminta", kirjaa ylös, mitä se pitää sisällään.'
						}
					</Typography>
					<TextField
						name={(lastField.id + 1).toString()}
						onChange={(event) => handleTextChange(event, lastField)}
						value={
							currentValues?.value.find((val) => val.id === 8)
								?.textAnswer?.text
								? currentValues?.value.find(
										(val) => val.id === 8
								  )?.textAnswer?.text
								: ''
						}
						variant='outlined'
						fullWidth
					/>
				</Box>
			)
		}
	}

	return (
		<Box>
			<TableContainer component={Paper}>
				<Table aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell></TableCell>
							{question.columns.map((column) => (
								<TableCell key={column.id} align='center'>
									{column.text}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{question.rows.map((row) => (
							<TableRow key={row.id}>
								<TableCell component='th' scope='row'>
									{row.text}
								</TableCell>
								{/* <RadioGroup row> */}
								{question.columns.map((column) => (
									<TableCell key={column.id} align='center'>
										<Radio
											onChange={() =>
												handleRadioChange(row, column)
											}
											checked={
												currentValues?.value.find(
													(answer) =>
														answer.id === row.id
												)?.answer.id === column.id
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
			{isOtherAnswered()}
		</Box>
	)
}

TableRadioBox.propTypes = {
	question: PropTypes.object
}

export default TableRadioBox
