import { useState,useEffect, useRef, KeyboardEvent, ChangeEvent, MouseEvent} from 'react';


interface AutocompleteProps{
       suggestions: string[];
}

// Definimos los tipos de operadores permitidos
type Operador = '+' | '-' | '*' | '/' | '';

const Calculadora: React.FC = () => {
       const [input, setInput] = useState<string>("");
       const [historial, setHistorial] = useState<string>("");

    // Función para manejar clics con tipado de evento
      const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
               const value = e.currentTarget.name;

               // Validación de operadores seguidos
                const operadores = ['+', '-', '*', '/'];
                console.log(operadores.includes(input.slice(-1)))
                  if (operadores.includes(value) && operadores.includes(input.slice(-1))) {
                       return;
                  }
                   setInput(prev => prev + value);
    }

     const borrarTodo = (): void => {
            setInput("");
            setHistorial("");
     };

    const calcular = (): void => {
    try {
      // Usamos un constructor de función tipado
      const resultado = new Function(`return ${input}`)() as number;
      
      setHistorial(`${input} =`);
      setInput(resultado.toString());
    } catch (error) {
      setInput("Error");
    }
  };

    return (
    <div style={styles.container}>
      <div style={styles.screen}>
        <div style={styles.history}>{historial}</div>
        <div style={styles.current}>{input || "0"}</div>
      </div>
      
      <div style={styles.grid}>
        <button name="+" onClick={handleClick} style={styles.buttonOp}>+</button>
        <button name="-" onClick={handleClick} style={styles.buttonOp}>-</button>
        <button name="*" onClick={handleClick} style={styles.buttonOp}>×</button>
        <button name="/" onClick={handleClick} style={styles.buttonOp}>÷</button>
        
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map(num => (
          <button 
            key={num} 
            name={num.toString()} 
            onClick={handleClick}
            style={styles.button}
          >
            {num}
          </button>
        ))}
        
        <button onClick={borrarTodo} style={styles.buttonClear}>C</button>
        <button onClick={calcular} style={styles.buttonEqual}>=</button>
      </div>
    </div>
  );
};

// Tipado de estilos (CSS-in-JS simple para el ejemplo)
const styles: { 
    [key: string]: React.CSSProperties } = {
    container: { 
    width: '300px', 
    margin: '20px auto', 
    fontFamily: 'Arial' 
   },
  screen: { 
    backgroundColor: '#333', 
    color: '#fff', 
    padding: '20px', 
    textAlign: 'right', 
    borderRadius: '8px' 
 },
  history: { 
    fontSize: '0.9rem', 
    color: '#bbb', 
    height: '1.2rem' 
 },
  current: { 
    fontSize: '2rem', 
    overflow: 'hidden' 
  },
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(4, 1fr)', 
    gap: '10px', 
    marginTop: '20px' 
  },
  button: { 
    padding: '20px', 
    fontSize: '1.2rem', 
    cursor: 'pointer' 
 },
  buttonOp: { 
    padding: '20px', 
    fontSize: '1.2rem', 
    backgroundColor: '#f0ad4e', 
    color: 'white' 
 },
  buttonClear: { 
    padding: '20px', 
    backgroundColor: '#d9534f', 
    color: 'white', 
    gridColumn: 'span 2' 
 },
  buttonEqual: { 
    padding: '20px', 
    backgroundColor: '#5cb85c', 
    color: 'white', 
    gridColumn: 'span 2' 
 }
}

export const Portafolio: React.FC<AutocompleteProps> = ({suggestions})=>{
       
    const [activeSuggestion, setArctivSuggestion]= useState<number>(0)
    const [filteredSuggestion, setFilteredSuggestion]=useState<string[]>([])
    const [showSuggestion, setShowSuggestion]=useState<boolean>(false)
    const [userInput, setUserInput]=useState<string>('')


    const containerRef = useRef<HTMLDivElement>(null)

    // Cerrar la lista si se hace clic fuera del componente
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        console.log('entro aqui containerRef.current.contains')
        setShowSuggestion(false);
      }
        console.log('fuera del condicional')
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

   const onChange =(e:ChangeEvent<HTMLInputElement>)=>{
        const value= e.currentTarget.value;
        const filtered= suggestions.filter(suggestion=>suggestion.toLowerCase().indexOf(value.toLowerCase())> - 1)
        setUserInput(value)
        setFilteredSuggestion(filtered)
        setArctivSuggestion(0)
        setShowSuggestion(true)
    };

    const onClick=(suggestion:string)=>{
        setUserInput(suggestion)
        setFilteredSuggestion([])
        setShowSuggestion(false)
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
            console.log('Se activo el enter')
            console.log(activeSuggestion)
            setUserInput(filteredSuggestion[activeSuggestion]);
            setShowSuggestion(false);
            } else if (e.key === "ArrowUp") {
            if (activeSuggestion === 0) return;
            console.log('Se activo ArrowUp')
           
             setArctivSuggestion(activeSuggestion - 1);
             console.log(activeSuggestion)
            
            } else if (e.key === "ArrowDown") {
            if (activeSuggestion === filteredSuggestion.length - 1) return;
           
            setArctivSuggestion(activeSuggestion + 1);
              console.log('ArrowDown '+  activeSuggestion +"==="+ filteredSuggestion.length + "- 1")
              console.log(activeSuggestion)
            }
     };


     return (
    <div ref={containerRef} className="autocomplete-wrapper">
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
        placeholder="Escribe para buscar..."
      />
      {showSuggestion && userInput && filteredSuggestion.length > 0 && (
        <ul className="suggestions-list">
          {filteredSuggestion.map((suggestion, index) => {
            let className = "";
            if (index === activeSuggestion) className = "suggestion-active";

            return (
              <li className={className} key={suggestion} onClick={() => onClick(suggestion)}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      )}

      <Calculadora />
    </div>
  );
}