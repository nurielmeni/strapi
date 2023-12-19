import type { Schema, Attribute } from '@strapi/strapi';

export interface DrillCrossMatch extends Schema.Component {
  collectionName: 'components_drill_cross_matches';
  info: {
    icon: 'project-diagram';
    description: '';
    displayName: 'CrossMatch';
  };
  attributes: {
    QAOptions: Attribute.Component<'drill.qa-options'> & Attribute.Required;
  };
}

export interface DrillDrillSettings extends Schema.Component {
  collectionName: 'components_drill_drill_settings';
  info: {
    icon: 'user-cog';
    description: '';
    displayName: 'DrillSettings';
  };
  attributes: {
    TimeLimit: Attribute.Component<'drill.time-limit'>;
    question_order: Attribute.Enumeration<
      ['Random', 'TopToBottom', 'BottomToTop']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'Random'>;
    show_end_results: Attribute.Boolean & Attribute.DefaultTo<true>;
    show_interim_results: Attribute.Boolean & Attribute.DefaultTo<true>;
    handling_of_mistakes: Attribute.Enumeration<
      ['RepeatTheQuestion', 'GoToNextQuestion']
    > &
      Attribute.Required;
    allow_correction_of_mistakes: Attribute.Boolean &
      Attribute.DefaultTo<false>;
    FeedbackForMistakes: Attribute.Enumeration<
      ['NoErrorMessage', 'ShowErrorMessage', 'ShowResultComparison']
    > &
      Attribute.Required;
    DisplayStack: Attribute.Boolean & Attribute.DefaultTo<false>;
    AllowReset: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface DrillFillInTheBlank extends Schema.Component {
  collectionName: 'components_drill_fill_in_the_blanks';
  info: {
    icon: 'text-width';
    description: '';
    displayName: 'FillInTheBlank';
  };
  attributes: {
    QAOptions: Attribute.Component<'drill.qa-options'> & Attribute.Required;
    reply_method: Attribute.Enumeration<['Dropdown', 'Type']> &
      Attribute.Required;
    show_availiable_choices: Attribute.Boolean & Attribute.DefaultTo<true>;
    display_placeholder: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface DrillFilterSettings extends Schema.Component {
  collectionName: 'components_drill_filter_settings';
  info: {
    icon: 'cogs';
    displayName: 'Filter_Settings';
  };
  attributes: {
    drill_category: Attribute.Enumeration<
      ['Practice', 'Test', 'Exam', 'Assessment', 'Filter']
    > &
      Attribute.Required;
    number_of_steps_back: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
  };
}

export interface DrillMultiChoice extends Schema.Component {
  collectionName: 'components_drill_multi_choices';
  info: {
    icon: 'check-double';
    displayName: 'MultiChoice';
  };
  attributes: {
    QAOptions: Attribute.Component<'drill.qa-options'> & Attribute.Required;
  };
}

export interface DrillPairs extends Schema.Component {
  collectionName: 'components_drill_pairs';
  info: {
    icon: 'american-sign-language-interpreting';
    description: '';
    displayName: 'Pairs';
  };
  attributes: {
    QASettings: Attribute.Component<'drill.qa-settings'> & Attribute.Required;
    TypingRules: Attribute.Component<'drill.typing-rules'>;
    SpeechRecognition: Attribute.Component<'drill.speech-recognition'>;
    TypingAids: Attribute.Component<'drill.typing-aids'>;
  };
}

export interface DrillQaOptions extends Schema.Component {
  collectionName: 'components_drill_qa_options';
  info: {
    icon: 'list-alt';
    description: '';
    displayName: 'QAOptions';
  };
  attributes: {
    question_display_settings: Attribute.Enumeration<
      ['Reading', 'Hearing', 'Reading_And_Hearing']
    > &
      Attribute.Required;
  };
}

export interface DrillQaSettings extends Schema.Component {
  collectionName: 'components_drill_qa_settings';
  info: {
    icon: 'database';
    description: '';
    displayName: 'QASettings';
  };
  attributes: {
    direction: Attribute.Enumeration<['Source_to_Target', 'Target_to_Source']> &
      Attribute.Required;
    reply_method: Attribute.Enumeration<
      ['Typing_the_Reply', 'Clicking_the_Reply']
    > &
      Attribute.Required;
    source_display_method: Attribute.Enumeration<
      ['Reading', 'Hearing', 'Reading_And_Hearing']
    > &
      Attribute.Required;
    number_of_options: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
        max: 16;
      }>;
  };
}

export interface DrillSingleChoice extends Schema.Component {
  collectionName: 'components_drill_single_choices';
  info: {
    icon: 'chess-pawn';
    description: '';
    displayName: 'SingleChoice';
  };
  attributes: {
    QAOptions: Attribute.Component<'drill.qa-options'> & Attribute.Required;
  };
}

export interface DrillSpeechRecognition extends Schema.Component {
  collectionName: 'components_drill_speech_recognitions';
  info: {
    icon: 'volume-down';
    description: '';
    displayName: 'SpeechRecognition';
  };
  attributes: {
    enable_TTS_on_reply: Attribute.Boolean & Attribute.DefaultTo<true>;
    enable_STT_on_reply: Attribute.Boolean & Attribute.DefaultTo<true>;
  };
}

export interface DrillTimeLimit extends Schema.Component {
  collectionName: 'components_drill_time_limits';
  info: {
    icon: 'clock';
    description: '';
    displayName: 'TimeLimit';
  };
  attributes: {
    is_time_limited: Attribute.Boolean & Attribute.DefaultTo<true>;
    seconds: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 2;
        max: 120;
      }>;
    show_clock: Attribute.Boolean & Attribute.DefaultTo<true>;
  };
}

export interface DrillTypingAids extends Schema.Component {
  collectionName: 'components_drill_typing_aids';
  info: {
    icon: 'keyboard';
    displayName: 'TypingAids';
  };
  attributes: {
    display_aid_buttons: Attribute.Boolean & Attribute.DefaultTo<true>;
    aid_buttons_random_order: Attribute.Boolean & Attribute.DefaultTo<true>;
    copy_question_into_answer_box: Attribute.Boolean &
      Attribute.DefaultTo<false>;
  };
}

export interface DrillTypingRules extends Schema.Component {
  collectionName: 'components_drill_typing_rules';
  info: {
    icon: 'exclamation';
    description: '';
    displayName: 'TypingRules';
  };
  attributes: {
    ignore_punctuation: Attribute.Boolean & Attribute.DefaultTo<true>;
    ignore_word_order: Attribute.Boolean & Attribute.DefaultTo<false>;
    ignore_capitalization: Attribute.Boolean & Attribute.DefaultTo<true>;
  };
}

export interface DrillVocabularyDrill extends Schema.Component {
  collectionName: 'components_drill_vocabulary_drills';
  info: {
    icon: 'exchange-alt';
    description: '';
    displayName: 'VocabularyDrill';
  };
  attributes: {
    QASettings: Attribute.Component<'drill.qa-settings'> & Attribute.Required;
    TypingRules: Attribute.Component<'drill.typing-rules'>;
    SpeechRecognition: Attribute.Component<'drill.speech-recognition'>;
  };
}

export interface GeneralAddress extends Schema.Component {
  collectionName: 'components_general_addresses';
  info: {
    icon: 'map-marked-alt';
    description: '';
    displayName: 'address';
  };
  attributes: {
    street: Attribute.String;
    number: Attribute.Integer;
    city: Attribute.String;
    type: Attribute.Enumeration<['Home', 'Work', 'Billing', 'Another']> &
      Attribute.DefaultTo<'Home'>;
    country: Attribute.Relation<
      'general.address',
      'oneToOne',
      'api::country.country'
    >;
    zip: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 5;
        maxLength: 10;
      }>;
  };
}

export interface GeneralPhone extends Schema.Component {
  collectionName: 'components_general_phones';
  info: {
    icon: 'phone';
    description: '';
    displayName: 'phone';
  };
  attributes: {
    number: Attribute.String;
    type: Attribute.Enumeration<['Mobile', 'Home', 'Work', 'Other']> &
      Attribute.DefaultTo<'Mobile'>;
  };
}

export interface GeneralTag extends Schema.Component {
  collectionName: 'components_general_tags';
  info: {
    icon: 'tag';
    displayName: 'Tag';
  };
  attributes: {
    name: Attribute.String;
  };
}

export interface SectionsCourseSection extends Schema.Component {
  collectionName: 'components_sections_course_sections';
  info: {
    icon: 'list-ol';
    description: '';
    displayName: 'CourseSection';
  };
  attributes: {
    sectionName: Attribute.String & Attribute.Required;
    section: Attribute.Relation<
      'sections.course-section',
      'oneToOne',
      'api::section.section'
    >;
    section_terms_of_transition: Attribute.Component<
      'sections.section-transitions',
      true
    > &
      Attribute.Required;
  };
}

export interface SectionsSectionTransitions extends Schema.Component {
  collectionName: 'components_sections_section_transitions';
  info: {
    icon: 'level-down-alt';
    description: '';
    displayName: 'sectionTransitions';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    from: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
        max: 100;
      }>;
    to: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
        max: 100;
      }>;
    action: Attribute.Enumeration<['Go_To_Next', 'Skip', 'End_All']> &
      Attribute.Required;
    sections_to_skip: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    student_choice: Attribute.Boolean & Attribute.DefaultTo<false>;
    result_feedback: Attribute.RichText;
  };
}

export interface SectionsStep extends Schema.Component {
  collectionName: 'components_sections_steps';
  info: {
    icon: 'file-signature';
    description: '';
    displayName: 'Step';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    terms_of_transition: Attribute.Component<'sections.transitions', true>;
    allow_incomplete_step: Attribute.Boolean & Attribute.DefaultTo<false>;
    step: Attribute.Relation<'sections.step', 'oneToOne', 'api::step.step'>;
  };
}

export interface SectionsTransitions extends Schema.Component {
  collectionName: 'components_steps_transitions';
  info: {
    icon: 'tasks';
    description: 'This is used only for step transitions';
    displayName: 'transitions';
  };
  attributes: {
    label: Attribute.String;
    from: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
        max: 100;
      }>;
    to: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
        max: 100;
      }>;
    action: Attribute.Enumeration<
      ['Redo_Current', 'Go_To_Next', 'Go_To_Previous', 'Skip', 'End_All']
    > &
      Attribute.Required;
    jump_to: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    result_feedback: Attribute.RichText;
  };
}

export interface SingleTypeDrawerItem extends Schema.Component {
  collectionName: 'components_single_type_drawer_items';
  info: {
    icon: 'minus';
    displayName: 'drawerItem';
  };
  attributes: {
    mdi_icon: Attribute.String;
    label: Attribute.String;
    route: Attribute.String;
    counter: Attribute.String;
  };
}

export interface StackBlank extends Schema.Component {
  collectionName: 'components_stack_blanks';
  info: {
    icon: 'window-minimize';
    description: '';
    displayName: 'Blank';
  };
  attributes: {
    PlaceHolder: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    Correct: Attribute.String & Attribute.Required;
    WrongChoice: Attribute.Component<'stack.wrong-choice', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
  };
}

export interface StackChoices extends Schema.Component {
  collectionName: 'components_stack_choices';
  info: {
    icon: 'check-circle';
    description: '';
    displayName: 'choices';
  };
  attributes: {
    value: Attribute.String & Attribute.Required;
    correct: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface StackContent extends Schema.Component {
  collectionName: 'components_stack_contents';
  info: {
    icon: 'book-open';
    description: '';
    displayName: 'Content';
  };
  attributes: {
    description: Attribute.Text;
    content: Attribute.RichText & Attribute.Required;
  };
}

export interface StackCrossMatchItem extends Schema.Component {
  collectionName: 'components_stack_cross_matche_items';
  info: {
    icon: 'arrows-alt-h';
    description: '';
    displayName: 'CrossMatch';
  };
  attributes: {
    Sentence: Attribute.String & Attribute.Required;
    MatchingValues: Attribute.Component<'stack.matching-values', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    DummyContainers: Attribute.String;
    DummyItems: Attribute.String;
  };
}

export interface StackCrossMatch extends Schema.Component {
  collectionName: 'components_stack_cross_matchs';
  info: {
    icon: 'arrows-alt-h';
    displayName: 'CrossMatch';
  };
  attributes: {
    CrossMatchItem: Attribute.Component<'stack.cross-match-item', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
  };
}

export interface StackFillInTheBlankItem extends Schema.Component {
  collectionName: 'components_stack_fill_in_the_blank_items';
  info: {
    icon: 'border-style';
    displayName: 'FillInTheBlankItem';
  };
  attributes: {
    Sentence: Attribute.String & Attribute.Required;
    BlankItem: Attribute.Component<'stack.blank', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
  };
}

export interface StackFillInTheBlank extends Schema.Component {
  collectionName: 'components_stack_fill_in_the_blanks';
  info: {
    icon: 'text-width';
    displayName: 'FillInTheBlank';
  };
  attributes: {
    FillInTheBlankItem: Attribute.Component<
      'stack.fill-in-the-blank-item',
      true
    > &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
  };
}

export interface StackMatchingValues extends Schema.Component {
  collectionName: 'components_stack_matching_values';
  info: {
    icon: 'grip-lines-vertical';
    description: '';
    displayName: 'MatchingValues';
  };
  attributes: {
    Container: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    Items: Attribute.String & Attribute.Required;
  };
}

export interface StackMultiChoiceItem extends Schema.Component {
  collectionName: 'components_stack_multi_choice_items';
  info: {
    icon: 'list';
    description: '';
    displayName: 'MultiChoiceItem';
  };
  attributes: {
    source: Attribute.String & Attribute.Required;
    choices: Attribute.Component<'stack.choices', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 2;
      }>;
  };
}

export interface StackMultiChoice extends Schema.Component {
  collectionName: 'components_stack_multi_choices';
  info: {
    icon: 'list-ul';
    displayName: 'MultiChoice';
  };
  attributes: {
    MultiChoiceItem: Attribute.Component<'stack.multi-choice-item', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
  };
}

export interface StackOptions extends Schema.Component {
  collectionName: 'components_stack_options';
  info: {
    icon: 'check';
    displayName: 'options';
  };
  attributes: {
    value: Attribute.String;
    correct: Attribute.Boolean;
  };
}

export interface StackPairItem extends Schema.Component {
  collectionName: 'components_stack_pair_items';
  info: {
    icon: 'grip-lines';
    description: '';
    displayName: 'PairItem';
  };
  attributes: {
    source: Attribute.String & Attribute.Required;
    target: Attribute.String & Attribute.Required;
    target_scatter: Attribute.String;
    source_scatter: Attribute.String;
  };
}

export interface StackPair extends Schema.Component {
  collectionName: 'components_stack_pairs';
  info: {
    icon: 'link';
    description: '';
    displayName: 'Pair';
  };
  attributes: {
    PairItem: Attribute.Component<'stack.pair-item', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
  };
}

export interface StackSingleChoiceItem extends Schema.Component {
  collectionName: 'components_stack_single_choice_items';
  info: {
    icon: 'window-maximize';
    description: '';
    displayName: 'SingleChoiceItem';
  };
  attributes: {
    source: Attribute.String & Attribute.Required;
    correct_choice: Attribute.String & Attribute.Required;
    WrongChoice: Attribute.Component<'stack.wrong-choice', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
  };
}

export interface StackSingleChoice extends Schema.Component {
  collectionName: 'components_stack_single_choices';
  info: {
    icon: 'bullseye';
    displayName: 'SingleChoice';
  };
  attributes: {
    SingleChoiceItem: Attribute.Component<'stack.single-choice-item', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
  };
}

export interface StackVocabularyItem extends Schema.Component {
  collectionName: 'components_stack_type_vocabulary_items';
  info: {
    icon: 'equals';
    description: '';
    displayName: 'VocabularyItem';
  };
  attributes: {
    source: Attribute.String & Attribute.Required;
    target: Attribute.String & Attribute.Required;
  };
}

export interface StackVocabulary extends Schema.Component {
  collectionName: 'components_stack_type_vocabularies';
  info: {
    icon: 'grip-vertical';
    description: '';
    displayName: 'Vocabulary';
  };
  attributes: {
    VocabularyItem: Attribute.Component<'stack.vocabulary-item', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
  };
}

export interface StackWrongChoice extends Schema.Component {
  collectionName: 'components_stack_wrong_choices';
  info: {
    icon: 'not-equal';
    description: '';
    displayName: 'WrongChoice';
  };
  attributes: {
    wrong_choice: Attribute.String & Attribute.Required;
  };
}

export interface StepCrossMatch extends Schema.Component {
  collectionName: 'components_step_cross_matches';
  info: {
    icon: 'crosshairs';
    displayName: 'CrossMatch';
  };
  attributes: {
    drill: Attribute.Relation<
      'step.cross-match',
      'oneToOne',
      'api::drill.drill'
    >;
    stack: Attribute.Relation<
      'step.cross-match',
      'oneToOne',
      'api::stack.stack'
    >;
  };
}

export interface StepElements extends Schema.Component {
  collectionName: 'components_step_elements';
  info: {
    icon: 'sort-amount-up-alt';
    displayName: 'elements';
  };
  attributes: {
    drill: Attribute.Relation<'step.elements', 'oneToOne', 'api::drill.drill'>;
    stack: Attribute.Relation<'step.elements', 'oneToOne', 'api::stack.stack'>;
  };
}

export interface StepFillInTheBlank extends Schema.Component {
  collectionName: 'components_step_fill_in_the_blanks';
  info: {
    icon: 'edit';
    displayName: 'FillInTheBlank';
  };
  attributes: {
    drill: Attribute.Relation<
      'step.fill-in-the-blank',
      'oneToOne',
      'api::drill.drill'
    >;
    stack: Attribute.Relation<
      'step.fill-in-the-blank',
      'oneToOne',
      'api::stack.stack'
    >;
  };
}

export interface StepFilter extends Schema.Component {
  collectionName: 'components_step_filters';
  info: {
    icon: 'filter';
    displayName: 'Filter';
  };
  attributes: {
    drill: Attribute.Relation<'step.filter', 'oneToOne', 'api::drill.drill'>;
  };
}

export interface StepHtml extends Schema.Component {
  collectionName: 'components_step_htmls';
  info: {
    icon: 'code';
    displayName: 'Html';
  };
  attributes: {
    stack: Attribute.Relation<'step.html', 'oneToOne', 'api::stack.stack'>;
  };
}

export interface StepMultiChoice extends Schema.Component {
  collectionName: 'components_step_multi_choices';
  info: {
    icon: 'cubes';
    displayName: 'MultiChoice';
  };
  attributes: {
    drill: Attribute.Relation<
      'step.multi-choice',
      'oneToOne',
      'api::drill.drill'
    >;
    stack: Attribute.Relation<
      'step.multi-choice',
      'oneToOne',
      'api::stack.stack'
    >;
  };
}

export interface StepPairs extends Schema.Component {
  collectionName: 'components_step_pairs';
  info: {
    icon: 'hand-peace';
    displayName: 'Pairs';
  };
  attributes: {
    drill: Attribute.Relation<'step.pairs', 'oneToOne', 'api::drill.drill'>;
    stack: Attribute.Relation<'step.pairs', 'oneToOne', 'api::stack.stack'>;
  };
}

export interface StepSingleChoice extends Schema.Component {
  collectionName: 'components_step_single_choices';
  info: {
    icon: 'hand-point-up';
    displayName: 'SingleChoice';
  };
  attributes: {
    drill: Attribute.Relation<
      'step.single-choice',
      'oneToOne',
      'api::drill.drill'
    >;
    stack: Attribute.Relation<
      'step.single-choice',
      'oneToOne',
      'api::stack.stack'
    >;
  };
}

export interface StepStepDefinitions extends Schema.Component {
  collectionName: 'components_step_step_definitions';
  info: {
    icon: 'cog';
    description: '';
    displayName: 'Step Definitions';
  };
  attributes: {};
}

export interface StepVocabulary extends Schema.Component {
  collectionName: 'components_step_vocabularies';
  info: {
    icon: 'book';
    description: '';
    displayName: 'Vocabulary';
  };
  attributes: {
    drill: Attribute.Relation<
      'step.vocabulary',
      'oneToOne',
      'api::drill.drill'
    >;
    stack: Attribute.Relation<
      'step.vocabulary',
      'oneToOne',
      'api::stack.stack'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'drill.cross-match': DrillCrossMatch;
      'drill.drill-settings': DrillDrillSettings;
      'drill.fill-in-the-blank': DrillFillInTheBlank;
      'drill.filter-settings': DrillFilterSettings;
      'drill.multi-choice': DrillMultiChoice;
      'drill.pairs': DrillPairs;
      'drill.qa-options': DrillQaOptions;
      'drill.qa-settings': DrillQaSettings;
      'drill.single-choice': DrillSingleChoice;
      'drill.speech-recognition': DrillSpeechRecognition;
      'drill.time-limit': DrillTimeLimit;
      'drill.typing-aids': DrillTypingAids;
      'drill.typing-rules': DrillTypingRules;
      'drill.vocabulary-drill': DrillVocabularyDrill;
      'general.address': GeneralAddress;
      'general.phone': GeneralPhone;
      'general.tag': GeneralTag;
      'sections.course-section': SectionsCourseSection;
      'sections.section-transitions': SectionsSectionTransitions;
      'sections.step': SectionsStep;
      'sections.transitions': SectionsTransitions;
      'single-type.drawer-item': SingleTypeDrawerItem;
      'stack.blank': StackBlank;
      'stack.choices': StackChoices;
      'stack.content': StackContent;
      'stack.cross-match-item': StackCrossMatchItem;
      'stack.cross-match': StackCrossMatch;
      'stack.fill-in-the-blank-item': StackFillInTheBlankItem;
      'stack.fill-in-the-blank': StackFillInTheBlank;
      'stack.matching-values': StackMatchingValues;
      'stack.multi-choice-item': StackMultiChoiceItem;
      'stack.multi-choice': StackMultiChoice;
      'stack.options': StackOptions;
      'stack.pair-item': StackPairItem;
      'stack.pair': StackPair;
      'stack.single-choice-item': StackSingleChoiceItem;
      'stack.single-choice': StackSingleChoice;
      'stack.vocabulary-item': StackVocabularyItem;
      'stack.vocabulary': StackVocabulary;
      'stack.wrong-choice': StackWrongChoice;
      'step.cross-match': StepCrossMatch;
      'step.elements': StepElements;
      'step.fill-in-the-blank': StepFillInTheBlank;
      'step.filter': StepFilter;
      'step.html': StepHtml;
      'step.multi-choice': StepMultiChoice;
      'step.pairs': StepPairs;
      'step.single-choice': StepSingleChoice;
      'step.step-definitions': StepStepDefinitions;
      'step.vocabulary': StepVocabulary;
    }
  }
}
