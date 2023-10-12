<script>
function generatePassword(length) {
  // Define character sets for different types of characters
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const specialChars = '!@#$%^&*()_-+=<>?';

  // Combine all character sets
  const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;

  let password = '';

  // Generate the password
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars.charAt(randomIndex);
  }

  return password;
}

// Example usage:
const generatedPassword = generatePassword(12); // Change the number to set the desired password length
console.log(generatedPassword);

</script>

<div>
  <button on:click={generatePassword}>Generate Password</button>
  <p>{/* Display the generated password here */}</p>
</div>
