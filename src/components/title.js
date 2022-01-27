import style from '../style/style.json';


const Title =(props) => {

    let Tag = props.tag || 'h1';
    return (
    <>
        <Tag>{props.children}</Tag>
        <style jsx>{`
            ${Tag} {
                color:${style.theme.colors.neutrals['000']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
    </>
        )
}
export default Title