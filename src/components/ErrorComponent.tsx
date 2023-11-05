
export function ErrorComponent () {
  
    const pagination = document.querySelector('.pagination') as HTMLElement;
    pagination.classList.add('hidden');
    
    return (
      <div>Page doesn't exist</div>
    );
  }
  
  export default ErrorComponent;