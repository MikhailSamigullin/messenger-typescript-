import { Block } from '../../utils/Block';

interface MessagePageProps {
}

export class MessagePage extends Block {
    constructor(props: MessagePageProps) {
        super('div', props);
        this.setProps({
			onClick: () => {
                console.log('log')
				// loginPage()
			},
        })
        
    }

    render() {
        return `    
        <main class="chat">
                <div class="chat__header">
                {{#BackButton href="/chat"}}
        {{/BackButton}}
                <a href="#" class="chat__photo"></a>
                <a href="#" class="chat__name">Вадим</a>
                <a href="#" class="chat__menu"></a>
            </div>
            <div class="dialog"></div>
            <form class="chat__footer" >
                <a href="#" class="chat__upload"></a>
                <input type="text" 
                class="chat__message"
                placeholder="Сообщение"
                name="message"></input>
                <button type="submit" class="chat__button"></button>
            </form>
        </div>
        </main>
    `
    }
}