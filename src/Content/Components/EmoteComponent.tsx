import * as React from 'react';
import { Main } from 'src/Content/Components/MainComponent';
import { EmoteStore } from 'src/Global/EmoteStore';
import styled from 'styled-components';

export class EmoteComponent extends React.PureComponent<EmoteComponent.Props, EmoteComponent.State> {
	state = {
		details: {
			visible: false,
			posX: 0,
			posY: 0
		},
		hover: false
	};

	render() {
		return (
			<EmoteComponent.Container style={{ minWidth: this.props.emote.width[0], minHeight: this.props.emote.height[0] }} className='7tv-emote' onMouseLeave={ev => this.onMouseEvent(false, ev)} onMouseEnter={ev => this.onMouseEvent(true, ev)}>
					<EmoteComponent.Style
						className='seventv-emote'
						onClick={(ev: React.MouseEvent) => this.openDetails(ev)}
					>
						<EmoteComponent.Img
							alt={this.props.emote.name}
							className={'chat-image chat-line__message--emote' + (this.isEmoji ? ' emoji' : '')}
							src={this.props.emote.cdn('1')} />
					</EmoteComponent.Style>
			</EmoteComponent.Container>
		);
	}

	getURL(): string {
		return ``;
	}

	onMouseEvent(hover: boolean, event: React.MouseEvent): void {
		Main.ShowTooltip.next({ event, emote: this, hover });
	}

	get isEmoji(): boolean {
		return this.props.emote.provider === 'EMOJI';
	}

	openDetails(ev: React.MouseEvent) {
		this.setState({
			details: {
				posX: ev.clientX,
				posY: ev.clientY,
				visible: true
			}
		});
	}
}

export namespace EmoteComponent {
	export interface Props {
		provider?: string | undefined | null;
		emote: EmoteStore.Emote;
		maxSize?: [number, number];
	}

	export interface State {
		details: {
			visible: boolean;
			posX: number;
			posY: number;
		};
		hover: boolean;
	}

	export const Container = styled.div`
		display: inline-block;
	`;

	export const Style = styled.div`

	`;

	export const Img = styled.img`
	`;

	export const Details = styled.div`
		display: block;

		.emote-name {
			width: 100%;
		}

		.emote-submitter {
			font-size: 2em;
		}

		.is-7tv-emote {
			font-size: 1.6em;
		}
	`;
}
