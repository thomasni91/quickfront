const gradesCalculation = (quizQuestions, userAnswers) => {
	const correctAnswers = quizQuestions.map(({ correctAnswer, _id }) => ({
		correctAnswer,
		_id,
	}));
	const inputAnswers = Object.entries(userAnswers).map(([key, value]) => {
		const { userAnswer } = value;
		return { _id: key, userAnswer };
	});
	const results =
		userAnswers &&
		correctAnswers.map((correctAnswer) => {
			const inputAnswer = inputAnswers?.find(
				(input) => input._id === correctAnswer._id,
			);
			return (
				inputAnswer?.userAnswer?.join() === correctAnswer.correctAnswer.join()
			);
		});
	let countCorrectAnswer = 0;
	results?.forEach((result) => {
		if (result) {
			countCorrectAnswer += 1;
		}
	});
	const grade = (countCorrectAnswer / results.length) * 100;
	return grade;
};

export default gradesCalculation;
