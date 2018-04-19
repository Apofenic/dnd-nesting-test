import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import Colors from './Colors'

const style = {
	border: '1px dashed gray',
	padding: '0.5rem',
	margin: '0.5rem',
}

const ColorSource = {
	canDrag(props) {
		return !props.forbidDrag
	},
  beginDrag() {
		return {}
	},
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class SourceBox extends Component {
  render() {
		const {
			color,
			children,
			isDragging,
			connectDragSource,
			forbidDrag,
			onToggleForbidDrag,
		} = this.props
		const opacity = isDragging ? 0.4 : 1

		let backgroundColor
		switch (color) {
			case Colors.YELLOW:
				backgroundColor = 'lightgoldenrodyellow'
				break
			case Colors.BLUE:
				backgroundColor = 'lightblue'
				break
			default:
				break
    }
    if(!connectDragSource) return null;
    return connectDragSource(
			<div
				style={{
					...style,
					backgroundColor,
					opacity,
					cursor: forbidDrag ? 'default' : 'move',
				}}
			>
				<input
					type="checkbox"
					checked={forbidDrag}
					onChange={onToggleForbidDrag}
				/>
				<small>Forbid drag</small>
				{children}
			</div>,
		)
	}
}

class StatefulSourceBox extends Component {
	constructor(props) {
		super(props)
		this.state = {
			forbidDrag: false,
		}
	}
  render() {
    const DragBox = DragSource(props => props.color, ColorSource, collect)(SourceBox);
		return (
			<DragBox
				{...this.props}
				forbidDrag={this.state.forbidDrag}
				onToggleForbidDrag={() => this.handleToggleForbidDrag()}
			/>
		)
	}
  handleToggleForbidDrag() {
		this.setState({
			forbidDrag: !this.state.forbidDrag,
		})
	}
}
SourceBox.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  forbidDrag: PropTypes.bool.isRequired,
  onToggleForbidDrag: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default StatefulSourceBox;