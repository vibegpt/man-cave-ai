export function buildManCavePrompt(styleId: string, customDescription?: string): string {
  const styles: { [key: string]: string } = {
    gaming: 'Edit this room to become a residential gaming man cave for 4-5 people. Keep the room structure and walls unchanged. Add 1-2 gaming desks with gaming chairs, dual monitors, RGB LED strips, gaming posters on walls, small gaming shelf display. Design for a home basement/garage, not a gaming center. Maintain realistic residential lighting and appropriate scale.',
    
    sports_bar: 'Edit this room to become a residential home sports bar for 4-5 people. Keep the room structure unchanged. Add a small home bar counter with 4-5 bar stools (NOT a full commercial bar), 2-3 wall-mounted TVs, sports memorabilia and framed jerseys on walls, vintage neon beer signs, mini fridge, dartboard. Design for a home basement or garage, not a commercial establishment. Keep walls and floor visible. Maintain realistic residential lighting and scale.',
    
    home_theater: 'Edit this room to become a residential home theater for 4-5 people. Keep the room structure unchanged. Add a single row of 4-5 theater recliners, one large TV or projection screen, soundbar, movie posters on walls, soft ambient lighting. Design for a home basement, not a commercial cinema. Maintain the original walls and floor. Keep realistic residential perspective and scale.',
    
    workshop: 'Edit this room to become a residential workshop for personal use. Keep the room structure unchanged. Add one workbench, wall-mounted pegboard with tools, tool storage cabinet, shop lighting. Design for a home garage or basement workshop, not an industrial facility. Keep the original walls visible. Maintain realistic residential lighting and scale.',
    
    whiskey_lounge: 'Edit this room to become a residential whiskey lounge for 4-5 people. Keep the room structure unchanged. Add 2-3 leather armchairs, small wooden bar cabinet with whiskey bottles, warm lighting, sophisticated wall art. Design for a home basement or study, not a commercial lounge. Keep walls visible. Maintain warm, realistic residential lighting and intimate scale.',
    
    golf_simulator: 'Edit this room to become a residential golf simulator for personal use. Keep the room structure unchanged. Add a golf projection screen on one wall, small putting green area, golf club wall display, 1-2 chairs for viewing. Design for a home basement or garage, not a commercial facility. Maintain original walls and realistic residential lighting.',
    
    poker_room: 'Edit this room to become a residential poker room for 4-5 people. Keep the room structure unchanged. Add one poker table with 5-6 chairs, card and chip display on wall, pendant light over table, small bar cart. Design for a home basement, not a casino. Keep walls visible. Maintain appropriate residential scale and sophisticated lighting.',
    
    music_studio: 'Edit this room to become a residential music studio for personal use. Keep the room structure unchanged. Add 1-2 musical instruments, acoustic foam panels, small recording desk with monitors, music posters. Design for a home basement or spare room, not a commercial studio. Maintain the original room architecture and realistic residential atmosphere.',
    
    cigar_lounge: 'Edit this room to become a residential cigar lounge for 4-5 people. Keep the room structure unchanged. Add 2-3 leather chairs, small wooden humidor cabinet, dark wood wall accents, vintage gentleman decor, warm lighting. Design for a home basement or study, not a commercial club. Keep walls visible. Maintain intimate residential scale and elegant atmosphere.',
  };

  if (styleId === 'custom' && customDescription) {
    return `Edit this room while keeping the room structure, walls, and basic architecture unchanged. ${customDescription}. Design for a residential home basement or garage for 4-5 people, not a commercial space. Maintain realistic residential lighting, perspective, and appropriate scale.`;
  }

  return styles[styleId] || styles.gaming;
}
