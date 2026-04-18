import { rationalize } from 'mathjs';

try {
  console.log('mathjs rationalize:', rationalize('1/sqrt(2)').toString());
} catch(e){
  console.log('Error', e.message);
}
