import React from 'react';
import PropTypes from 'prop-types';
import { CKEditor } from '@ckeditor/ckeditor5-react';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import HlxEditor from './ckeditor';
import styled from 'styled-components';

const Wrapper = styled.div`
  .ck-editor__main {
    min-height: 200px;
    > div {
      min-height: 200px;
    }
  }
`;

const configuration = {
    toolbar: {
        items: [
            'sourceEditing',
            'htmlEmbed',
            '|',
            'heading',
            '|',
            'link',
            'bulletedList',
            'numberedList',
            'highlight',
            'horizontalLine',
            '|',
            'alignment',
            'outdent',
            'indent',
            '|',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            '|',
            'fontColor',
            'fontBackgroundColor',
            'fontFamily',
            'fontSize',
            '|',
            'bold',
            'italic',
            'strikethrough',
            'underline',
            '|',
            'textPartLanguage',
            '|',
            'undo',
            'redo',
            'findAndReplace',
        ],
        shouldNotGroupWhenFull: true,
    },
    htmlSupport: {
        allow: [
            // Enables plain <iframe> elements.
            {
                name: 'iframe',
                attributes: true,
                classes: true,
                styles: true
            },
            // Enables plain <div> elements.
            {
                name: 'div',
                attributes: true,
                classes: true,
                styles: true
            }
        ]
    },  
    fontSize: {
        options: [
            {
                title: 'Tiny',
                model: '12px'
            },
            {
                title: 'Small',
                model: '14px'
            },
            {
                title: 'Normal',
                model: '16px'
            },
            {
                title: 'Big',
                model: '22px'
            },
            {
                title: 'Bigger',
                model: '34px'
            },
            {
                title: 'Large',
                model: '46px'
            },
            {
                title: 'Huge',
                model: '58px'
            }
        ],
        supportAllValues: true
    },
    language: {
        textPartLanguage: [
            {
                languageCode: 'en',
                textDirection: 'ltr',
                title: 'English'
            },
            {
                languageCode: 'uk',
                textDirection: 'ltr',
                title: 'Ukrainian'
            },
            {
                languageCode: 'he',
                textDirection: 'rtl',
                title: 'Hebrew'
            },
            {
                languageCode: 'hu',
                textDirection: 'ltr',
                title: 'Hungarian'
            },
            {
                languageCode: 'ru',
                textDirection: 'ltr',
                title: 'Russian'
            },
        ],
    },
    image: {
        toolbar: [
            'imageTextAlternative',
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side'
        ]
    },
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableCellProperties',
            'tableProperties'
        ]
    },
};

const Editor = ({ onChange, name, value }) => {
    return (
        <Wrapper>
            <CKEditor
                editor={HlxEditor}
                config={configuration}
                data={value}
                onReady={editor => editor.setData(value)}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange({ target: { name, value: data } });
                }}
            />
        </Wrapper>
    );
};

Editor.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
};

export default Editor;
