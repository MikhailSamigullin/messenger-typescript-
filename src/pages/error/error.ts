import { Block } from '../../utils/Block';




interface ErrorPageProps {
    error: string;
    title: string;
    description: string;
}

export class ErrorPage extends Block {
    constructor(props: ErrorPageProps) {
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
        <main class="error__container">
        <div class="error-block">
            <h1 class="error-block__number">{{error}}</h1>
            <div class="error-block__message">{{title}}<br>{{description}}</div>
            <div class="error-block__back">
                <a href="/chat">
                    Назад к чатам
                </a> 
            </div>
        </div>
    </main>
    `
    }
}