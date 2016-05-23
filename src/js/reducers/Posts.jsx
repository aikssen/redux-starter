// updates the state
// We don’t mutate the state

/*
The Object.assign() method is used to copy the values
of all enumerable own properties from one or more source
objects to a target object. It will return the target object.
*/
/* eslint-disable */
function posts(state = [], action) {
	switch(action.type) {
		case 'INCREMENT_LIKES':
			console.log("Incrementing Likes!!");
			const i = action.index;
			return [
				...state.slice(0,i), // before the one we are updating
				{...state[i], likes: state[i].likes + 1}, //Object.assign()
				...state.slice(i + 1), // after the one we are updating
			]
		default:
			return state;
	}
}
/* eslint-enable */
export default posts;
