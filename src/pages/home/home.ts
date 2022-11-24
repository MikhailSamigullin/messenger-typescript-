import { Block } from '../../utils/Block';
// import { loginPage } from '../index';



interface HomePageProps {
    title: string;
    titleSub: string;
}

export class HomePage extends Block {
    constructor(props: HomePageProps) {
        super('div', props);
        this.setProps({
			onClick: () => {
                console.log('log')
				// loginPage()
			},
        })
        
    }
    // onButtonClick = () => {
    //     console.log('click on the button');
    // }

    render() {
        return `
        <main class="index__container">
        <div class="enter">
            <h1 class="enter__title">{{title}}
                <br>
                {{titleSub}}
                 
            </h1>
            <form action="./login" method="get">
               {{#Button class="button" type="submit" }}
                Авторизоваться      
            {{/Button}} 
            </form>
            
            <nav class="enter__link-list">
                <ul>
                    <li><a href="#" class="enter__link">Контакты</a></li>
                    <li><a href="#" class="enter__link">Политика конфиденциальности</a></li>
                    <li><a href="#" class="enter__link">© 2022 Company name</a></li>
                    <li><a href="#" class="enter__link">Условия использования</a></li>
                </ul>

            </nav>
            <br>
            <a href="/error404">Ссылка на страницу 404</a>

            <a href="/error500">Ссылка на страницу 500</a>
        </div>

    </main>
    
    
    `
    }
}